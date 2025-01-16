/* eslint-disable @typescript-eslint/no-explicit-any */
export declare global {
  declare namespace NodeJS {
    export interface ProcessEnv {
      SENTRY_PROJECT: string;
      SENTRY_ORG: string;
      SENTRY_AUTH_TOKEN: string;
      UPSTASH_REDIS_REST_URL: string;
      UPSTASH_REDIS_REST_TOKEN: string;
      OPENAI_API_KEY: string;
      HELIUS_API_KEY: string;
    }
  }

  interface HeliusAssetResponse {
    jsonrpc: "2.0";
    result: {
      interface: string;
      id: string;
      content: {
        $schema: string;
        json_uri: string;
        files: {
          uri: string;
          cdn_uri: string;
          mime: string;
        }[];
        metadata: {
          description: string;
          name: string;
          symbol: string;
          token_standard: string;
        };
        links: {
          image: string;
        };
      };
      authorities: {
        address: string;
        scopes: string[];
      }[];
      compression: {
        eligible: boolean;
        compressed: boolean;
        data_hash: string;
        creator_hash: string;
        asset_hash: string;
        tree: string;
        seq: number;
        leaf_id: number;
      };
      grouping: any[];
      royalty: {
        royalty_model: string;
        target: null;
        percent: number;
        basis_points: number;
        primary_sale_happened: boolean;
        locked: boolean;
      };
      creators: any[];
      ownership: {
        frozen: boolean;
        delegated: boolean;
        delegate: null;
        ownership_model: string;
        owner: string;
      };
      supply: null;
      mutable: boolean;
      burnt: boolean;
      token_info: {
        symbol: string;
        supply: number;
        decimals: number;
        token_program: string;
        price_info: {
          price_per_token: number;
          currency: string;
        };
      };
    };
    id: string;
  }

  interface CoinMetadata {
    name: string;
    symbol: string;
    description: string;
    marketCap: number;
    currentPrice: number;
  }
}
