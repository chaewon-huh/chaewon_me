import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { type LinksFunction, type MetaFunction } from "@remix-run/cloudflare";
import stylesheet from "~/tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", type: "image/png", href: "/icon.png" },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Chaewon Huh" },
    {
      name: "description",
      content: "A minimal portfolio showcasing my work and thoughts",
    },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="antialiased">
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
            width: '100%', 
            maxWidth: '48rem', 
            paddingTop: '128px',
            paddingBottom: '80px',
            paddingLeft: '32px',
            paddingRight: '32px'
          }}>
            {children}
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
