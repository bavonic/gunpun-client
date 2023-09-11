import { Response as ExpressResponse } from "express";

export interface Queries {
  offset?: number,
  limit?: number,
  q?: string,
}

export interface Errors { [fieldName: string]: string };

export enum TokenUnit {
  /**
   * Decimal 18
   */
  ether = 'ether',
  /**
   * Decimal 9
   */
  gwei = 'gwei',
  /**
   * Decimal 6
   */
  mwei = 'mwei',
}

export enum MarketOrderStatus {
  LISTING = 0,
  CANCELED = 1,
  TRADED = 2,
  MIGRATED = 3,
}

export type MarketLastTradedType = 'BUY_NOW' | 'AUCTION' | 'OFFER';

export interface ListResponse<T> {
  count: number,
  data: T
}

export interface AppResponse extends ExpressResponse {
  user: any,
  onError: any,
  onResponse: (result: any) => any,
}