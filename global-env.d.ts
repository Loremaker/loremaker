export declare global {
  declare namespace NodeJS {
    export interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      SENTRY_PROJECT: string;
      SENTRY_ORG: string;
      SENTRY_AUTH_TOKEN: string;
      UPSTASH_REDIS_REST_URL: string;
      UPSTASH_REDIS_REST_TOKEN: string;
      OPENAI_API_KEY: string;
    }
  }
}
