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
  page?: number;
  // ...
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
  const nextPage = tvShowResult.page + 1;
  const nextPageUrl = url.parse(`${THE_MOVIE_DB_API_BASE}/discover/tv?page=${nextPage}`);

  console.log(`Checking ${nextPageUrl.href} in cache`);
  const value = myCache.get<string>( nextPageUrl.href );

  if ( value == undefined ) {
    console.log(`Pre-Fetching ${nextPageUrl.href} for future use`);

    const nextPageUrlWithKey = appendQuery(nextPageUrl.href, {
      "api_key": THE_MOVIE_DB_API_KEY
    });

    request(nextPageUrlWithKey, undefined, function (error, response: request.RequestResponse, body: string) {
      if (!error && response.statusCode == 200) {
          console.log(`Saving ${nextPageUrl.href} in cache`);

          myCache.set<string>( nextPageUrl.href, body );
      } else {
          console.warn(`Error ${body}`);
      }
    });
  } else {
    console.log(`Not Pre-Fetching ${nextPageUrl.href} as it was found in cache`);
  }
}
