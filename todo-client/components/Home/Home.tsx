import { Spinner, Stack, VStack } from "@chakra-ui/react";
import { Header } from "../Header";
import { TodoScreen } from "../Todo";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { Login } from "../Login";
import { useAccessToken } from "../../hooks/useAccessToken";

const createApolloClient = (accessToken: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_APPSYNC_API_URL,
      headers: {
        Authorization: accessToken,
      },
    }) as any,
    cache: new InMemoryCache(),
  });
};

export const Home = () => {
  const { accessToken, isLoading } = useAccessToken();

  if (isLoading)
    return (
      <Stack w='full' h='100vh' justifyContent='center' alignItems='center'>
        <Spinner
          thickness='4px'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Stack>
    );

  if (!accessToken) {
    return <Login />;
  } else {
    const client = createApolloClient(accessToken);
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
