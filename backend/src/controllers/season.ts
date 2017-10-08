"use strict";

import * as url from "url";
import * as appendQuery from "append-query";
import * as async from "async";
import * as request from "request";
import * as NodeCache from "node-cache";
import { Response, Request, NextFunction } from "express";
import * as tvUtil from "./tvUtil";

interface TvSeasonDetail {
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

/**
 * GET /api
 * List of API examples.
 */
export let getApi = (req: Request, res: Response) => {
  tvUtil.fetch(req.originalUrl, function callback(body: string) {
    parseResultAndQueryNext(body, req.params);
  }).pipe(res);
};

function parseResultAndQueryNext(body: string, params: any) {
  // TV Season, URL looks like /tv/{tv_id}/season/{season_number}
  const tvShowId = params.tv_id;
  const tvSeasonDetail = <TvSeasonDetail>JSON.parse(body);

  // Fetch the details of every episode
  tvSeasonDetail.episodes.forEach(function(episode) {
    tvUtil.fetch(`/tv/${tvShowId}/season/${tvSeasonDetail.season_number}/episode/${episode.episode_number}`);
  });
}
