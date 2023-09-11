import { ChainId, TokenType } from "../../shared/blockchain";

export interface TokenQuery {
  chainId: ChainId,
  contractAddress: string,
  tokenId: string,
}

export class TokenEntity {
  _id: string;
  ref: string;
  tokenId: string;
  tokenURI?: string;
  type: TokenType;
  chainId: ChainId;
  contractAddress: string;
  owner: string;
  quantity: number;
  name?: string;
  description?: string;
  image?: string;
  external_link?: string;
  attributes: any[];
  traits: any[];
  highestPriceInUsd: number;
  favoriteCount: number;
  viewCount: number;
  updatedAt: number;
  createdAt: number;
}