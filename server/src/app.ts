import { monitor } from "@colyseus/monitor";
import { json } from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { onError } from './middlewares';
import { onResponse } from "./middlewares/onResponse.middleware";
import { apiRouter } from './modules';
import { RedisModule } from "./modules/redis";
import { ErrorMessage, logger } from './utils';
const statusMonitor = require('express-status-monitor')();

export const app = express();

app.use(statusMonitor);
app.use(cors());
app.use(json());
app.use(onError);
app.use(onResponse);

app.get('/ping', (_, res) => res.json({ message: 'Welcome!' }));
app.use('/api', apiRouter);
app.use('/colyseus', monitor());
app.delete(`/redis`, (_, res: any) => {
  RedisModule.reset()
    .then(() => res.json({ success: true }))
    .catch(res.onError);
})

app.use((_, res) => res.status(404).json({ success: false, message: ErrorMessage.INVALID_ROUTE }));

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  logger('ERROR', 'Internal Server Error', error.stack);
  res.status(500).json({ success: false, message: ErrorMessage.INTERNAL_SERVER_ERROR });
});