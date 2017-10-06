"use strict";

import * as url from "url";
import * as appendQuery from "append-query";
import * as async from "async";
import * as request from "request";
import { Response, Request, NextFunction } from "express";

const THE_MOVIE_DB_API_BASE = "https://api.themoviedb.org/3";
const THE_MOVIE_DB_API_KEY = "00e139cee8bd741b03785ab5b22aca5c";

/**
 * GET /api
 * List of API examples.
 */
export let getApi = (req: Request, res: Response) => {
  const movieUrl = url.parse(`${THE_MOVIE_DB_API_BASE}${req.originalUrl}`);
  const movieUrlWithKey = appendQuery(movieUrl.href, {
    "api_key": THE_MOVIE_DB_API_KEY
  });

  console.log(`Requesting ${movieUrlWithKey} ...`);
  const apiRequest = request(movieUrlWithKey);
  apiRequest.pipe(res);
};
