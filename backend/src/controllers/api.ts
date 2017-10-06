"use strict";

import { URL } from "url";
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
  const movieUrl = new URL(`${THE_MOVIE_DB_API_BASE}${req.originalUrl}`);
  movieUrl.searchParams.append("api_key", THE_MOVIE_DB_API_KEY);

  console.log(`Requesting ${movieUrl.href}...`);
  const apiRequest = request(movieUrl.href);
  apiRequest.pipe(res);
};
