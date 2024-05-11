import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

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
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ApolloProvider client={graphQLClient}>
      <Outlet />
      <LiveReload />
    </ApolloProvider>
  );
}
