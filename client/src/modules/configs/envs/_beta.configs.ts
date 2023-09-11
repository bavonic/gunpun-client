import { ChainId } from 'shared/blockchain/types'
import { Configs } from '../types'

export const betConfigs: Configs = {
  URL_SERVER_MAIN: '',
  URL_SERVER_GAME: '',
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
