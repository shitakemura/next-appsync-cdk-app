import { VStack } from "@chakra-ui/react";
import { TodoList } from "./TodoList";

export const TodoScreen = () => {
  return (
    <VStack w='full' spacing={10} paddingX={48} paddingY={16}>
      <TodoList />
    </VStack>
  );
};
