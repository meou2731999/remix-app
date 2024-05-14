# Welcome to Remix Project!

Remix-App is a comprehensive web application built with Remix.js, featuring a multi-page architecture with seamless routing and testing capabilities. It provides an intuitive user interface to explore continents and countries, with detailed information available at every level.

Key Features:

- **Home Page**: The landing page of the application welcomes users and provides an overview of the available features.

- **Continents List Page**: Displays a list of continents, allowing users to browse through different regions of the world.

- **Continent Detail Page**: Provides detailed information about a selected continent, including its name, description, and associated countries.

- **Countries List Page**: Shows a list of countries within a continent, enabling users to explore individual countries further.

- **Country Detail Page**: Offers comprehensive details about a specific country, including its name, capital and more.

- **Seamless Routing**: Implements client-side routing for smooth navigation between pages, ensuring a seamless browsing experience.

- **Testing**: Includes comprehensive testing suites to ensure the reliability and stability of the application. Testing covers unit tests, integration tests, and end-to-end tests to verify functionality across all components and pages.


## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Remix**: A modern web framework for building React applications with server-rendered components.
- **Jest**: A JavaScript testing framework for unit testing React components and utilities.
- **Babel**: A JavaScript compiler that transforms modern JavaScript code into backward-compatible versions.
- **Tailwind CSS**: A utility-first CSS framework for building custom designs quickly.

## Getting Started:

Clone the repository: 
```shellscript
git clone https://github.com/meou2731999/remix-app.git
```

Install dependencies:
```shellscript
npm install
```

Generate TypeScript types based on your GraphQL schema: 
```shellscript
npm run generate-types
```

Start the development server: 

```shellscript
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your web browser to explore the application.

## Testing

Run test:

```shellscript
npm test
```

Check test coverage:

```shellscript
npm run test:coverage 
```


## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## References
- [https://remix.run/](https://remix.run/)
- [https://carbonable.medium.com/build-a-remix-app-with-apollo-and-graphql-7a1d10395224
](https://carbonable.medium.com/build-a-remix-app-with-apollo-and-graphql-7a1d10395224
)
