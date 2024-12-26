// deno-lint-ignore-file no-explicit-any

import type { FC } from "hono/jsx";

import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";
import { poweredBy } from "hono/powered-by";

const app = new Hono();

app.use("*", logger(), poweredBy());
app.all("/favicon.ico", serveStatic({ path: "./public/favicon.ico" }));

type Props = {
  title: string;
  children?: any;
};

const Layout: FC<Props> = (props) => {
  return (
    <html>
      <head>
        <title>{props.title}</title>
      </head>
      <body>{props.children}</body>
    </html>
  );
};

const Top: FC = () => {
  return (
    <Layout title="JB">
      <p>Hello World!</p>
    </Layout>
  );
};

app.get("/", (c) => {
  return c.html(<Top />);
});

Deno.serve(app.fetch);
