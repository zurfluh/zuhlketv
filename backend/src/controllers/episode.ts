"use strict";

import * as url from "url";
import * as appendQuery from "append-query";
import * as async from "async";
import * as request from "request";
import * as NodeCache from "node-cache";
import { Response, Request, NextFunction } from "express";
import * as tvUtil from "./tvUtil";

export let getApi = (req: Request, res: Response) => {
  tvUtil.fetch(req.originalUrl, 2, function callback(statusCode: number, body: string) {
    res.status(statusCode).send(body);
  });
};
