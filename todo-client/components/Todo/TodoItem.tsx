import { Checkbox, HStack, Spinner, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useCallback, useState } from "react";
import {
  namedOperations,
  Todo,
  useDeleteTodoMutation,
  useToggleTodoMutation,
} from "../../graphql/generated/generated-types";

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  const [todoItem, setTodoItem] = useState<Todo>(todo);

  const [toggleTodo, toggleTodoStatus] = useToggleTodoMutation();
  const [deleteTodo, deleteTodoStatus] = useDeleteTodoMutation();

  const handleToggleTodo = useCallback(() => {
    if (toggleTodoStatus.loading) return;
    toggleTodo({
      variables: {
        toggleTodoInput: { id: todoItem.id, completed: !todoItem.completed },
      },
      onCompleted: () =>
        setTodoItem({ ...todoItem, completed: !todoItem.completed }),
    });
  }, [toggleTodoStatus.loading, todoItem, toggleTodo]);

  const handleDeleteTodo = useCallback(() => {
    if (deleteTodoStatus.loading) return;
    deleteTodo({
      variables: { id: todoItem.id },
      refetchQueries: [namedOperations.Query.GetTodos],
    });
  }, [deleteTodoStatus.loading, todoItem.id, deleteTodo]);

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
      {deleteTodoStatus.loading ? (
        <Spinner
          size='md'
          thickness='4px'
          emptyColor='gray.200'
          color='blue.500'
        />
      ) : (
        <DeleteIcon
          color='blue.500'
          boxSize={5}
          _hover={{ boxSize: 6 }}
          onClick={handleDeleteTodo}
        />
      )}
    </HStack>
  );
};
