"use strict";

import * as url from "url";
import * as appendQuery from "append-query";
import * as async from "async";
import * as request from "request";
import * as NodeCache from "node-cache";
import { Response, Request, NextFunction } from "express";

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
  const value = myCache.get<Buffer>( movieUrl.href );

  if ( value == undefined ) {
    console.log(`Didn't find ${movieUrl.href} in cache`);

    const movieUrlWithKey = appendQuery(movieUrl.href, {
      "api_key": THE_MOVIE_DB_API_KEY
    });

    console.log(`Requesting ${movieUrlWithKey}`);

    const apiRequest = request(movieUrlWithKey);

    const bufs: Buffer[] = [];
    apiRequest.on("data", function(d: Buffer){
      bufs.push(d);
    });
    apiRequest.on("end", function(){
      const buf = Buffer.concat(bufs);
      myCache.set<Buffer>( movieUrl.href, buf );
    });

    apiRequest.pipe(res);
  } else {
    console.log(`Found ${movieUrl.href} in cache, length: ${value.length}`);

    res.write(value);
    res.end();
  }

};
