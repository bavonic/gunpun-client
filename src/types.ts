import { Details } from "express-useragent";
import { RequestError } from "modules/request";

export type ObjectID = string;

export enum AppEnv {
  STAGING = 'STAGING',
  BETA = 'BETA',
  PRODUCTION = 'PRODUCTION',
}
export interface Device {
  type: EDeviceType,
  origin?: Details,
  isiPad: boolean,
  isiPhone: boolean,
}

export type DataLocale = {
  [locale: string]: any
}

export enum ELocale {
  ENGLISH = 'en_US',
  JAPAN = 'ja_JP',
}

export enum EDeviceType {
  Desktop = 'Desktop',
  Mobile = 'Mobile',
  Tablet = 'Tablet',
}

export interface WindowDimensions {
  height: number,
  width: number,
  type: 'landscape' | 'portrait',
  isMetamaskBrowser?: boolean
}

export interface AssetItem {
  medium: string,
  large?: string,
}

export interface Option {
  label: any,
  value: any,
}

export interface CoordinatePlayer {
  x: number,
  y: number,
}

export interface CoordinateMonster {
  x: number,
  y: number,
  bodyX: number,
  bodyY: number,
}

export type OnLoad = (percent: number) => any;

export interface PageHead {
  title?: string,
  thumbnailURL?: string,
  routePath?: string,
  description?: string,
  siteName?: string,
  type?: string,
}

export interface DataState<DataType> {
  isFetching?: boolean,
  isInitialized?: boolean,
  error?: string,
  total?: number,
  data?: DataType,
  [fieldName: string]: any,
}

export interface ListApiState<T> {
  count: number,
  data: T[],
  error?: RequestError,
  isFetching?: boolean,
  isInitialized?: boolean,
  [field: string]: any,
}

export interface Query {
  offset?: number,
  limit?: number,
  q?: string,
}
