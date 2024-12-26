// deno-lint-ignore-file no-explicit-any

import type { FC } from "hono/jsx";

import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";
import { poweredBy } from "hono/powered-by";
import { html } from "hono/html";

const app = new Hono();

app.use("*", logger(), poweredBy());
app.all("/favicon.ico", serveStatic({ path: "./public/favicon.ico" }));

type LayoutProps = {
  title: string;
  children?: any;
};

const Layout: FC<LayoutProps> = (props) => {
  return (
    <html lang="en">
      <head>
        <title>{props.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Joshua Byrd"></meta>
        <meta
          name="description"
          content="The personal website of Joshua Byrd."
        ></meta>
      </head>
      <body>{props.children}</body>
    </html>
  );
};

const Shell = (props: { children: any }) => {
  return html`<!DOCTYPE html>
    <html lang="en">
      ${props.children}
    </html>`;
};

const App: FC = () => {
  return (
    <Shell>
      <Layout title="JB">
        <p>Hello World!</p>
      </Layout>
    </Shell>
  );
};

app.get("/", (c) => {
  return c.html(<App />);
});

Deno.serve({ port: 1337 }, app.fetch);
