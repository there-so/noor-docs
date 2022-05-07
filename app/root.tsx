import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import styles from "./tailwind.css";

// core styles shared by all of react-notion-x (required)
import notionStyles1 from "react-notion-x/src/styles.css";

// used for code syntax highlighting (optional)
import notionStyles2 from "prismjs/themes/prism-tomorrow.css";

// used for collection views (optional)
import notionStyles3 from "rc-dropdown/assets/index.css";

// used for rendering equations (optional)
import notionStyles4 from "katex/dist/katex.min.css";

import pageContentStyles from "~/components/pageContent.css";

export const meta: MetaFunction = () => {
  return { title: "Noor Docs" };
};

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: notionStyles1 },
    { rel: "stylesheet", href: notionStyles2 },
    { rel: "stylesheet", href: notionStyles3 },
    { rel: "stylesheet", href: notionStyles4 },
    { rel: "stylesheet", href: pageContentStyles },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Pacifico&display=swap&text=Docs",
    },
  ];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
