import { InMemoryCache } from "@apollo/client/cache/inmemory/inMemoryCache";
import { ApolloClient } from "@apollo/client/core/ApolloClient";
import { createHttpLink } from "@apollo/client/link/http/createHttpLink";
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import stylesheet from "~/tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

// Initialize Apollo client
const graphQLClient = new ApolloClient({
  ssrMode: true, // Indicates that we want to use server side rendering
  link: createHttpLink({
    // Use createHttpLink instead of uri
    uri: "https://countries.trevorblades.com/graphql", //Path to GraphQL schema
    headers: {
      "Access-Control-Allow-Origin": "*", //Cors management
    },
  }),
  cache: new InMemoryCache(), // Cache management
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>{children}</body>
    </html>
  );
}

export default function App() {
  return (
    <ApolloProvider client={graphQLClient}>
      <Outlet />
      <ScrollRestoration />
      <Scripts />
    </ApolloProvider>
  );
}
