"use strict";

import * as url from "url";
import * as appendQuery from "append-query";
import * as async from "async";
import * as request from "request";
import * as NodeCache from "node-cache";
import { Response, Request, NextFunction } from "express";
import * as tvUtil from "./tvUtil";

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

export let getApi = (req: Request, res: Response) => {
  tvUtil.fetch(req.originalUrl, 0, function callback(statusCode: number, body: string) {
    res.status(statusCode).send(body);
    if (statusCode === 200) {
      parseResultAndQueryNext(body, req.query);
    }
  });
};

function parseResultAndQueryNext(body: string, query: any) {
  // Discover result
  const tvShowResult = <TvShowResult>JSON.parse(body);

  // Fetch the next 5 pages
  for (let i = 1; i <= 5; i++) {
    let nextPageUrl = `/discover/tv?page=${tvShowResult.page + i}`;
    for (const propName in query) {
      if (query.hasOwnProperty(propName) && propName != "page") {
        nextPageUrl += "&" + propName + "=" + query[propName];
      }
    }
    tvUtil.fetch(nextPageUrl, 5);
  }

  // And fetch the details of every show
  tvShowResult.results.forEach(function(tvShow) {
    tvUtil.fetch(`/tv/${tvShow.id}`, 7);
    // Also fetch the first season, as the GUI will jump straight to season 1 of a series!
    tvUtil.fetch(`/tv/${tvShow.id}/season/1`, 7);
  });
}
