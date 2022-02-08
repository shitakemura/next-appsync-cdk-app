import { VStack } from "@chakra-ui/react";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const todos = [
    { id: "001", title: "first todo" },
    { id: "002", title: "second todo" },
  ];

  return (
    <VStack w='full' paddingX={8}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </VStack>
  );
};
