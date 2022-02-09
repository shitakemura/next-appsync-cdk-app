import { VStack } from "@chakra-ui/react";
import { useGetTodosQuery } from "../../graphql/generated/generated-types";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";

export const TodoScreen = () => {
  const { loading, error, data } = useGetTodosQuery();

  return (
    <VStack w='full' spacing={10} paddingX={48} paddingY={16}>
      <TodoInput />
      <TodoList todos={data?.getTodos ?? []} />
    </VStack>
  );
};
