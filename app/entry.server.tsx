import type { AppLoadContext, EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import * as ReactDOMServer from "react-dom/server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  _loadContext: AppLoadContext
) {
  const { renderToReadableStream, renderToString } = ReactDOMServer as {
    renderToReadableStream?: typeof ReactDOMServer.renderToReadableStream;
    renderToString?: typeof ReactDOMServer.renderToString;
  };

  const streamRenderer =
    renderToReadableStream ??
    ((element: React.ReactElement, opts?: { signal?: AbortSignal }) => {
      const encoder = new TextEncoder();
      const html = renderToString ? renderToString(element) : "";
      return new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(html));
          controller.close();
        },
        cancel() {},
      });
    });

  const body = await streamRenderer(
    <RemixServer context={remixContext} url={request.url} />,
    {
      signal: request.signal,
      onError(error: unknown) {
        console.error(error);
        responseStatusCode = 500;
      },
    }
  );

  if (isbot(request.headers.get("user-agent") || "")) {
    await body.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
