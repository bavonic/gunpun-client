import { ChainId } from 'shared/blockchain/types'
import { Configs } from '../types'

export const productionConfigs: Configs = {
  URL_SERVER_MAIN: 'https://api.gunpun.io',
  URL_SERVER_GAME: 'https://api-game.gunpun.io',
  chains: {
    [ChainId.BSC]: {
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
