import { networkChainConfigs } from "./_networks.chainConfigs";
import { AppChainConfig } from "../types";

export const productionChainBscConfig: AppChainConfig = {
  env: 'production',
  information: networkChainConfigs.bsc,
  urlChainApi: 'https://bsc-api.mesea.io',
  urlMainApi: 'https://api-worker.mesea.io',
}

export const productionChainConfigs = [productionChainBscConfig];