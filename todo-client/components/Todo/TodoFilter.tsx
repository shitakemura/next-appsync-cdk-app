import { HStack, Button } from "@chakra-ui/react";
import { FILTER_VALUES } from ".";
import { Filter } from "./TodoScreen";

type TodoFilterProps = {
  filter: Filter;
  setFilter: (Filter: Filter) => void;
};

export const TodoFilter = ({ filter, setFilter }: TodoFilterProps) => {
  return (
    <HStack spacing={4}>
      {FILTER_VALUES.map((filterValue) => (
        <Button
          key={filterValue}
          colorScheme={filter === filterValue ? "blue" : undefined}
          color={filter === filterValue ? "white" : undefined}
          onClick={() => setFilter(filterValue)}>
          {filterValue}
        </Button>
      ))}
    </HStack>
  );
};
