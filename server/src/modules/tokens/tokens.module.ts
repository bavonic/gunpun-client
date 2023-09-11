import { getChainConfig } from "../chain-configs";
import { TokenQuery, TokenEntity } from "./tokens.types";
import axios from 'axios';

export class TokenModule {
  static async getDetail(query: TokenQuery): Promise<TokenEntity> {
    const chain = getChainConfig(query.chainId);
    const response = await axios.get(chain.urlMainApi + `/api/tokens/${query.contractAddress}/${query.tokenId}`, {
      headers: {
        ['chain-id']: query.chainId,
      },
    })
    return response.data;
  }
}