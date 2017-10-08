"use strict";

import * as url from "url";
import * as appendQuery from "append-query";
import * as request from "request";
import * as NodeCache from "node-cache";
import { Readable } from "stream";
import Bottleneck from "bottleneck";

export const THE_MOVIE_DB_API_BASE = "https://api.themoviedb.org/3";
const THE_MOVIE_DB_API_KEY = "00e139cee8bd741b03785ab5b22aca5c";

// limits concurrent requests to unlimited but limits time between requests to min 100 ms. This means we should obey our potential 40 requests per second limit.
// Note on limiting concurrent requests: in the callback of a request we sometimes trigger new requests via queryAndSave(). This can lead to a DEADLOCK!
const apiLimiter = new Bottleneck(0, 100);
const tvCache = new NodeCache( { stdTTL: 3600, checkperiod: 300, useClones: false } );

export let checkCache = (originalUrl: string, parseResultAndQueryNext: Function) => {
  const movieUrl = url.parse(`${THE_MOVIE_DB_API_BASE}${originalUrl}`);

    console.log(`Checking ${movieUrl.href} in cache`);
    const value = tvCache.get<string>( movieUrl.href );

    if ( value == undefined ) {
      console.log(`Didn't find ${movieUrl.href} in cache`);

      const movieUrlWithKey = appendQuery(movieUrl.href, {
        "api_key": THE_MOVIE_DB_API_KEY
      });

      console.log(`Requesting ${movieUrlWithKey}`);

      const s = new Readable();
      s._read = function noop() {};
      const requestCallback = function (error: any, response: request.RequestResponse, body: string) {
        console.log(`ApiLimiter has requested`);
        s.push(body);
        s.push(null); // end of the stream
        handleApiResponse(movieUrl, error, response, body, parseResultAndQueryNext);
      };
      apiLimiter.submit(request, movieUrlWithKey, undefined, requestCallback, function() {
        // ApiLimiter callback, NOOP
        console.log(`ApiLimiter is done`);
      });

      return s;
    } else {
      console.log(`Found ${movieUrl.href} in cache, ${value.length}`);

      parseResultAndQueryNext(value);

      const s = new Readable();
      s._read = function noop() {};
      s.push(value);
      s.push(null); // end of the stream
      return s;
    }
};

const handleApiResponse = (movieUrl: url.Url, error: any, response: request.RequestResponse, body: string, callback: Function) => {
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

    const requestCallback = function (error: any, response: request.RequestResponse, body: string) {
      console.log(`ApiLimiter has requested`);
      if (!error && response.statusCode == 200) {
          console.log(`Saving ${toFetch.href} in cache`);

          tvCache.set<string>( toFetch.href, body );
      } else {
          console.warn(`Error during fetch of ${toFetch.href}: ${body}`);
      }
    };
    apiLimiter.submit(request, fetchWithKey, undefined, requestCallback, function () {
        // ApiLimiter callback, NOOP
        console.log(`ApiLimiter is done`);
      });
  } else {
    console.log(`Not Pre-Fetching ${toFetch.href} as it was found in cache`);
  }
};
