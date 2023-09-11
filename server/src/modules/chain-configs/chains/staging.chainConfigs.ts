import { networkChainConfigs } from "./_networks.chainConfigs";
import { AppChainConfig } from "../types";

export const stagingChainFantomConfig: AppChainConfig = {
  env: 'staging',
  information: networkChainConfigs.fantom,
  urlChainApi: 'https://staging-fantom-api.mesea.io',
  urlMainApi: 'https://staging-api-worker.mesea.io',
}

export const stagingChainBscTestnetConfig: AppChainConfig = {
  env: 'staging',
  information: networkChainConfigs.bscTestnet,
  urlChainApi: 'https://staging-bsctestnet-api.mesea.io',
  urlMainApi: 'https://staging-api-worker.mesea.io',
}

export const stagingChainBscConfig: AppChainConfig = {
  env: 'staging',
  information: networkChainConfigs.bsc,
  urlChainApi: 'https://staging-bsc-api.mesea.io',
  urlMainApi: 'https://staging-api-worker.mesea.io',
}

export const stagingChainEthwConfig: AppChainConfig = {
  env: 'staging',
  information: networkChainConfigs.ethw,
  urlChainApi: 'https://staging-ethw-api.mesea.io',
  urlMainApi: 'https://staging-api-worker.mesea.io',
}

export const stagingChainConfigs = [stagingChainFantomConfig, stagingChainBscConfig, stagingChainBscTestnetConfig, stagingChainEthwConfig];