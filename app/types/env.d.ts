/// <reference types="@cloudflare/workers-types" />

export interface Env {
  PONIX_BUCKET: R2Bucket;
  FAL_API_KEY: string;
  AMPLITUDE_API_KEY: string;
}

declare module "@remix-run/cloudflare" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

declare global {
  interface Window {
    ENV?: {
      AMPLITUDE_API_KEY?: string;
    };
  }
}
