"use strict";

import * as url from "url";
import * as appendQuery from "append-query";
import * as request from "request";
import * as NodeCache from "node-cache";
import { Readable } from "stream";
import Bottleneck from "bottleneck";

export const THE_MOVIE_DB_API_BASE = "https://api.themoviedb.org/3";
const THE_MOVIE_DB_API_KEY = "00e139cee8bd741b03785ab5b22aca5c";

// limits concurrent requests to 5 and limits time between requests to min 125 ms. This should often (but not always!) mean we obey our potential 40 requests per second limit.
const directApiLimiter = new Bottleneck(5, 125, -1, Bottleneck.strategy.LEAK, true);
const tvCache = new NodeCache( { stdTTL: 3600, checkperiod: 300, useClones: false } );

/**
 * Returns the MovieDB content found at originalUrl as a stream, either from cache, or freshly fetched.
 * @param originalUrl - The URL identifying the content
 * @param parseResultAndQueryNext - optional callback function to be called with the body and statusCode of the response. Must handle error cases!
 */
export let fetch = (originalUrl: string, priority: number, parseResultAndQueryNext?: (statusCode: number, body: string) => void) => {
  const movieUrl = url.parse(`${THE_MOVIE_DB_API_BASE}${originalUrl}`);

    console.log(`Checking ${movieUrl.href} in cache`);
    const value = tvCache.get<string>( movieUrl.href );

    if ( value == undefined ) {
      const movieUrlWithKey = appendQuery(movieUrl.href, {
        "api_key": THE_MOVIE_DB_API_KEY
      });

      console.log(`Didn't find ${movieUrl.href} in cache, fetching ${movieUrlWithKey}`);

      const apiRequestCallback = function(error: any, response: request.RequestResponse, body: string) {
        handleApiResponse(movieUrl, error, response, body, parseResultAndQueryNext);
      };
      const asyncMovieApiCall = function (callback: Function) {
        request(movieUrlWithKey, undefined, apiRequestCallback);
        callback();
      };
      rateLimit(asyncMovieApiCall, priority);
    } else {
      console.log(`Found ${movieUrl.href} in cache, length: ${value.length}`);

      if (parseResultAndQueryNext) {
        parseResultAndQueryNext(200, value);
      }
    }
};

/**
 * Handles movie API responses, either logging errors or saving result to cache & calling callback with body if successful
 * @param movieUrl - URL that was originally requested
 * @param error - error object, filled in case an error occured
 * @param response - the API response object
 * @param body - the API response body, containing the returned entity
 * @param callback - function to be called with the body & statusCode
 */
const handleApiResponse = (movieUrl: url.Url, error: any, response: request.RequestResponse, body: string, callback?: (statusCode: number, body: string) => void) => {
  const statusCode = response.statusCode;
  if (!error && statusCode == 200) {
    console.log(`Saving ${movieUrl.href} in cache`);
    tvCache.set<string>( movieUrl.href, body );
  } else {
    console.warn(`Error during fetch of ${movieUrl.href}: ${body}`);
  }

  if (callback) {
    callback(statusCode, body);
  }
};

const rateLimit = (asyncMovieApiCall: (callback: Function) => void, priority: number) => {
  const apiLimiterCallback = function() {
      // NOOP
  };
  /*
  const nbQueued = directApiLimiter.nbQueued();
  const nbRunning = directApiLimiter.nbRunning();
  console.log(`ApiLimiter requesting, queued: ${nbQueued}, running: ${nbRunning}`);
  */
  directApiLimiter.submitPriority(priority, asyncMovieApiCall, apiLimiterCallback);
};
