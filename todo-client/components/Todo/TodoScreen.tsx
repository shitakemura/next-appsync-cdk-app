import { Progress, Spinner, Stack, VStack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useGetTodosQuery } from "../../graphql/generated/generated-types";
import { TodoFilter } from "./TodoFilter";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";

export const FILTER_VALUES = ["ALL", "COMPLETED", "NOT COMPLETED"] as const;
type FilterTupel = typeof FILTER_VALUES;
export type Filter = FilterTupel[number];

export const TodoScreen = () => {
  const { loading, error, data } = useGetTodosQuery();
  const [filter, setFileter] = useState<Filter>("ALL");

  const todos = useMemo(() => {
    switch (filter) {
      case "ALL":
        return data?.getTodos ?? [];
      case "COMPLETED":
        return data?.getTodos.filter((todo) => todo.completed) ?? [];
      case "NOT COMPLETED":
        return data?.getTodos.filter((todo) => !todo.completed) ?? [];
    }
  }, [filter, data?.getTodos]);

  if (loading) return null;

  return (
    <VStack w='full' spacing={10} paddingX={48} paddingY={16}>
      <TodoInput />
      <TodoFilter filter={filter} setFilter={setFileter} />
      <TodoList todos={todos} />
    </VStack>
  );
};
