"use strict";

import * as url from "url";
import * as appendQuery from "append-query";
import * as async from "async";
import * as request from "request";
import * as NodeCache from "node-cache";
import { Response, Request, NextFunction } from "express";

interface DiscoverTvQuery {
  language?: string;
  sort_by?: string;
  'air_date.gte'?: string;
  'air_date.lte'?: string;
  'first_air_date.gte'?: string;
  'first_air_date.lte'?: string;
  first_air_date_year?: number;
  page?: number;
  timezone?: string;
  'vote_average.gte'?: number;
  'vote_count.gte'?: number;
  with_genres?: string;
  with_networks?: string;
  without_genres?: string;
  'with_runtime.gte'?: number;
  'with_runtime.lte'?: number;
  include_null_first_air_dates?: boolean;
  with_original_language?: string;
  without_keywords?: string;
  screened_theatrically?: boolean;
}

interface TvShowResult {
  page: number;
  total_results: number;
  total_pages: number;
  results: TvShow[];
}

interface TvShow {
  poster_path: string;
  populatiry: number;
  id: number;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

export interface TvShowDetail {
  backdrop_path: string | null;
  created_by: {
      id: number;
      name: string;
      gender: number | null;
      profile_path: string;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
      id: number;
      name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  name: string;
  networks: {
      id: number;
      name: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_countr: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: {
      id: number;
      name: string;
  }[];
  seasons: {
      air_date: string;
      episode_count: number;
      id: number;
      poster_path: string | null;
      season_number: number;
  }[];
  status: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface TvSeasonDetail {
  _id: number;
  air_date: string;
  episodes: {
      air_date: string;
      crew: {
          id: number;
          credit_id: number;
          name: string;
          department: string;
          job: string;
          profile_path: string | null;
      }[];
      episode_number: number;
      guest_starts: Object[];
      name: string;
      overview: string;
      id: number;
      production_code: string | null;
      season_number: number;
      still_path: string | null;
      vote_average: number;
      vote_count: number;
  }[];
  name: string;
  overview: string;
  id: number;
  poster_path: string | null;
  season_number: number;
}

const THE_MOVIE_DB_API_BASE = "https://api.themoviedb.org/3";
const THE_MOVIE_DB_API_KEY = "00e139cee8bd741b03785ab5b22aca5c";

const myCache = new NodeCache( { stdTTL: 3600, checkperiod: 300, useClones: false } );

/**
 * GET /api
 * List of API examples.
 */
export let getApi = (req: Request, res: Response) => {
  const movieUrl = url.parse(`${THE_MOVIE_DB_API_BASE}${req.originalUrl}`);

  console.log(`Checking ${movieUrl.href} in cache`);
  const value = myCache.get<string>( movieUrl.href );

  if ( value == undefined ) {
    console.log(`Didn't find ${movieUrl.href} in cache`);

    const movieUrlWithKey = appendQuery(movieUrl.href, {
      "api_key": THE_MOVIE_DB_API_KEY
    });

    console.log(`Requesting ${movieUrlWithKey}`);

    const apiRequest = request(movieUrlWithKey, undefined, function (error, response: request.RequestResponse, body: string) {
      handleApiResponse(movieUrl, error, response, body);
    });

    apiRequest.pipe(res);
  } else {
    console.log(`Found ${movieUrl.href} in cache, ${value.length}`);

    parseResultAndQueryNext(value);

    res.write(value);
    res.end();
  }
};

function handleApiResponse(movieUrl: url.Url, error: any, response: request.RequestResponse, body: string) {
  if (!error && response.statusCode == 200) {
    console.log(`Saving ${movieUrl.href} in cache`);
    myCache.set<string>( movieUrl.href, body );

    parseResultAndQueryNext(body);
  } else {
    console.warn(`Error ${body}`);
  }
}

function parseResultAndQueryNext(body: string) {
  const tvShowResult = <TvShowResult>JSON.parse(body);

  // Fetch the next 5 pages
  for (let i = 1; i <= 5; i++) {
    queryAndSave(url.parse(`${THE_MOVIE_DB_API_BASE}/discover/tv?page=${tvShowResult.page + i}`));
  }
}

function queryAndSave(toFetch: url.Url) {
  console.log(`Checking ${toFetch.href} in cache`);
  const value = myCache.get<string>( toFetch.href );

  if ( value == undefined ) {
    console.log(`Pre-Fetching ${toFetch.href} for future use`);

    const fetchWithKey = appendQuery(toFetch.href, {
      "api_key": THE_MOVIE_DB_API_KEY
    });

    request(fetchWithKey, undefined, function (error, response: request.RequestResponse, body: string) {
      if (!error && response.statusCode == 200) {
          console.log(`Saving ${toFetch.href} in cache`);

          myCache.set<string>( toFetch.href, body );
      } else {
          console.warn(`Error ${body}`);
      }
    });
  } else {
    console.log(`Not Pre-Fetching ${toFetch.href} as it was found in cache`);
  }
}