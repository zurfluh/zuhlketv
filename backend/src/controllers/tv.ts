"use strict";

import * as url from "url";
import * as appendQuery from "append-query";
import * as async from "async";
import * as request from "request";
import * as NodeCache from "node-cache";
import { Response, Request, NextFunction } from "express";
import * as tvUtil from "./tvUtil";

interface TvShowDetail {
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

export let getApi = (req: Request, res: Response) => {
  tvUtil.fetch(req.originalUrl, 1, parseResultAndQueryNext).pipe(res);
};

function parseResultAndQueryNext(body: string) {
  // TV Show, URL looks like /tv/{tv_id}
  const tvShowDetail = <TvShowDetail>JSON.parse(body);

  // Fetch the details of every eason
  tvShowDetail.seasons.forEach(function(season) {
    tvUtil.fetch(`/tv/${tvShowDetail.id}/season/${season.season_number}`, 6);
  });
}
