# Todo App - client

Todo app client built with Next.js

## Used Packages

- [Next.js](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Auth0 React](https://auth0.com/docs/libraries/auth0-react)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [GraphQL Code Generator](https://www.graphql-code-generator.com/)

## .env file

```
# AppSync
NEXT_PUBLIC_APPSYNC_API_URL="YOUR_APPSYNC_API_URL"

# Auth0
NEXT_PUBLIC_AUTH0_DOMAIN="YOUR_AUTH0_DOMAIN"
NEXT_PUBLIC_AUTH0_CLIENT_ID="YOUR_AUTH0_CLIENT_ID"
NEXT_PUBLIC_AUTH0_REDIERCT_URL="YOUR_AUTH0_REDIERCT_URL"
NEXT_PUBLIC_AUTH0_AUTHORIZER_IDENTIFIER="YOUR_AUTH0_AUTHORIZER_IDENTIFIER"
NEXT_PUBLIC_AUTH0_SCOPE="openid profile email"
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run export`

Builds the app for production to the `out` folder.\
