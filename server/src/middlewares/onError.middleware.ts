import { Request, NextFunction } from 'express';
import { ServerError, ObjectUtils, ErrorMessage, logger } from '../utils';

export function onError(_: Request, res: any, next: NextFunction) {
  res.onError = (error: ServerError) => {
    if (!error.status) logger('ERROR', 'Internal Server Error', error);
    let body: any = {
      message: error.status ? error.message : ErrorMessage.INTERNAL_SERVER_ERROR,
      errors: error.errors
    };
    if (!ObjectUtils.isEmptyObj(error.errors)) body.errors = error.errors
    res.status(error.status || 500).send(body);
  }
  next();
}