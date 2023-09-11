import { NextFunction, Request } from "express";
import { ENV } from "../../AppConfigs";
import { ErrorMessage, ServerError } from "../../utils";
import { betaChainConfigs } from "./chains/beta.chainConfigs";
import { productionChainConfigs } from "./chains/production.chainConfigs";
import { stagingChainConfigs } from "./chains/staging.chainConfigs";

export const chainConfigs = ENV.indexOf('production') !== -1 ? productionChainConfigs
  : ENV.indexOf('beta') !== -1 ? betaChainConfigs
    : stagingChainConfigs;

export const getChainConfig = (chainId: any) => {
  if (!chainId) throw new ServerError(ErrorMessage.CHAIN_ID_MUST_BE_PROVIDED, 400);
  const config = chainConfigs.find(v => v.information.chainId === chainId);
  if (!config) throw new ServerError(ErrorMessage.CHAIN_DOES_NOT_SUPPORTED, 400);
  return config;
}

export const chainConfigMiddleware = async (req: Request, res: any, next: NextFunction) => {
  try {
    const chainId = req.headers["chain-id"] as any;
    const chain = getChainConfig(chainId);
    res.chain = chain;
    next();
  } catch (error) {
    res.onError(error);
  }
}