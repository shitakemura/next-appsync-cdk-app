import { VStack } from "@chakra-ui/react";
import { Header } from "../Header";
import { TodoScreen } from "../Todo";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { Login } from "../Login";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_APPSYNC_API_URL,
    headers: {
      "X-Api-Key": process.env.NEXT_PUBLIC_APPSYNC_API_KEY,
    },
  }),
  cache: new InMemoryCache(),
});

export const Home = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Login />;
  } else {
    return (
      <VStack>
        <ApolloProvider client={client}>
          <Header />
          <TodoScreen />
        </ApolloProvider>
      </VStack>
    );
  }
};
