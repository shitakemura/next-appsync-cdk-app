import { VStack } from "@chakra-ui/react";
import { useGetTodosQuery } from "../../graphql/generated/generated-types";
import { TodoList } from "./TodoList";

export const TodoScreen = () => {
  const { loading, error, data } = useGetTodosQuery();

  return (
    <VStack w='full' spacing={10} paddingX={48} paddingY={16}>
      <TodoList todos={data?.getTodos ?? []} />
    </VStack>
  );
};
