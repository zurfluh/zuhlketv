"use strict";

import * as url from "url";
import * as appendQuery from "append-query";
import * as request from "request";
import * as NodeCache from "node-cache";
import { Readable } from "stream";

export const THE_MOVIE_DB_API_BASE = "https://api.themoviedb.org/3";
export const THE_MOVIE_DB_API_KEY = "00e139cee8bd741b03785ab5b22aca5c";

export const tvCache = new NodeCache( { stdTTL: 3600, checkperiod: 300, useClones: false } );

export let checkCache = (originalUrl: string, parseResultAndQueryNext: Function) => {
  const movieUrl = url.parse(`${THE_MOVIE_DB_API_BASE}${originalUrl}`);

    console.log(`Checking ${movieUrl.href} in cache`);
    const value = tvCache.get<string>( movieUrl.href );

    if ( value == undefined ) {
      console.log(`Didn"t find ${movieUrl.href} in cache`);

      const movieUrlWithKey = appendQuery(movieUrl.href, {
        "api_key": THE_MOVIE_DB_API_KEY
      });

      console.log(`Requesting ${movieUrlWithKey}`);

      const apiRequest = request(movieUrlWithKey, undefined, function (error, response: request.RequestResponse, body: string) {
        handleApiResponse(movieUrl, error, response, body, parseResultAndQueryNext);
      });

      return apiRequest;
    } else {
      console.log(`Found ${movieUrl.href} in cache, ${value.length}`);

      parseResultAndQueryNext(value);

      const s = new Readable();
      s.push(value);
      s.push(null); // end of the stream
      return s;
    }
};

export let handleApiResponse = (movieUrl: url.Url, error: any, response: request.RequestResponse, body: string, callback: Function) => {
  if (!error && response.statusCode == 200) {
    console.log(`Saving ${movieUrl.href} in cache`);
    tvCache.set<string>( movieUrl.href, body );

    callback(body);
  } else {
    console.warn(`Error during fetch of ${movieUrl.href}: ${body}`);
  }

  return body;
};

export let queryAndSave = (toFetch: url.Url) => {
  console.log(`Checking ${toFetch.href} in cache`);
  const value = tvCache.get<string>( toFetch.href );

  if ( value == undefined ) {
    console.log(`Pre-Fetching ${toFetch.href} for future use`);

    const fetchWithKey = appendQuery(toFetch.href, {
      "api_key": THE_MOVIE_DB_API_KEY
    });

    request(fetchWithKey, undefined, function (error, response: request.RequestResponse, body: string) {
      if (!error && response.statusCode == 200) {
          console.log(`Saving ${toFetch.href} in cache`);

          tvCache.set<string>( toFetch.href, body );
      } else {
          console.warn(`Error during fetch of ${toFetch.href}: ${body}`);
      }
    });
  } else {
    console.log(`Not Pre-Fetching ${toFetch.href} as it was found in cache`);
  }
};
