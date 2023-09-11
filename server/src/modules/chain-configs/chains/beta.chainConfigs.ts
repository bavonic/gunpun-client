import { networkChainConfigs } from "./_networks.chainConfigs";
import { AppChainConfig } from "../types";

export const betaChainBscConfig: AppChainConfig = {
  env: 'beta',
  information: networkChainConfigs.bsc,
  urlChainApi: 'https://beta-bsc-api.mesea.io',
  urlMainApi: 'https://beta-api-worker.mesea.io',
}

export const betaChainEthwConfig: AppChainConfig = {
  env: 'beta',
  information: networkChainConfigs.ethw,
  urlChainApi: 'https://beta-ethw-api.mesea.io',
  urlMainApi: 'https://beta-api-worker.mesea.io',
}

export const betaChainConfigs = [betaChainBscConfig, betaChainEthwConfig];