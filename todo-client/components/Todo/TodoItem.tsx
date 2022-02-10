import { Checkbox, HStack, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import {
  Todo,
  useToggleTodoMutation,
} from "../../graphql/generated/generated-types";

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  const [todoItem, setTodoItem] = useState<Todo>(todo);

  const [toggleTodo, { data, loading }] = useToggleTodoMutation();

  const handleToggleTodo = useCallback(() => {
    if (loading) return;
    toggleTodo({
      variables: {
        toggleTodoInput: { id: todoItem.id, completed: !todoItem.completed },
      },
      onCompleted: () =>
        setTodoItem({ ...todoItem, completed: !todoItem.completed }),
    });
  }, [loading, todoItem, toggleTodo]);

  return (
    <HStack
      borderColor='blue.300'
      borderWidth={1}
      p={8}
      w='full'
      height='16'
      justify='space-between'
      spacing={8}>
      <HStack spacing={8}>
        <Checkbox
          size='lg'
          isChecked={todoItem.completed}
          onChange={handleToggleTodo}
        />
        <Text
          textDecoration={todoItem.completed ? "line-through" : undefined}
          color={todoItem.completed ? "gray.500" : "black"}>
          {todoItem.title}
        </Text>
      </HStack>
    </HStack>
  );
};
