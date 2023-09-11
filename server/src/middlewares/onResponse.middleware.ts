import { NextFunction, Request } from 'express';
import { AppResponse } from '../AppTypes';

export function onResponse(_: Request, res: AppResponse, next: NextFunction) {
  res.onResponse = (result: any) => {
    res.send(result);
  }
  
  next();
}