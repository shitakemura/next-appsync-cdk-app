import { VStack } from "@chakra-ui/react";
import { Header } from "../Header";
import { TodoScreen } from "../Todo";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_APPSYNC_API_URL,
  cache: new InMemoryCache(),
});

export const Home = () => {
  return (
    <VStack>
      <ApolloProvider client={client}>
        <Header />
        <TodoScreen />
      </ApolloProvider>
    </VStack>
  );
};
