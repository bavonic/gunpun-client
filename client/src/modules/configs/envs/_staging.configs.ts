import { ChainId } from 'shared/blockchain/types'
import { Configs } from '../types'

export const stagingConfigs: Configs = {
  URL_SERVER_MAIN: 'https://api-staging.gunpun.io',
  URL_SERVER_GAME: 'http://localhost:4001',
  // URL_SERVER_GAME: 'http://192.168.1.35:4001',
  // URL_SERVER_GAME:'https://api-game-staging.gunpun.io',

  chains: {
    [ChainId.BSC_TESTNET]: {
      features: {
      },
      erc1155s: {
      },
      erc20s: {

      },
      erc721s: {
      }
    },
  },
}
