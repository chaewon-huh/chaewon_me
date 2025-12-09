import { createRequestHandler } from "@remix-run/cloudflare";
import * as build from "./build/server/index.js";

// Create the Remix request handler once to avoid re-instantiating it per request
const handleRequest = createRequestHandler(build, build.mode);

export default {
  async fetch(request, env, ctx) {
    return handleRequest(request, {
      cloudflare: { env, ctx },
    });
  },
};
