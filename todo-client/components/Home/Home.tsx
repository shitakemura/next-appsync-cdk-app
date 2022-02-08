import { VStack } from "@chakra-ui/react";
import { Header } from "../Header";
import { TodoScreen } from "../Todo";

export const Home = () => {
  return (
    <VStack>
      <Header />
      <TodoScreen />
    </VStack>
  );
};
