import React from 'react';
import {
  ButtonGroup, Button, Flex,
} from '@chakra-ui/react';
import uniqid from 'uniqid';
import SortByDate from './SortByDate';

const SortButtons = ({
  sortPosts, selectedSort, currentFilter, handleSetFilter,
}) => {
  const filters = {
    ALL: {
      value: '',
      name: 'All',
    },
    DONE: {
      value: 'done',
      name: 'Done',
    },
    UNDONE: {
      value: 'undone',
      name: 'Undone',
    },
  };
  return (
    <Flex justify="space-between" align="center" mb="15px">
      <ButtonGroup spacing={3} direction="row" align="center" justifyContent="center">
        {Object.values(filters).map(({ value, name }) => (
          <Button
            _active={{
              background: '#0077b6',
            }}
            _hover={{
              background: '#0077b6',
            }}
            key={uniqid()}
            background="#0096c7"
            variant="solid"
            isActive={currentFilter === value}
            type="button"
            color="white"
            onClick={() => handleSetFilter(value)}
          >
            {name}
          </Button>
        ))}
        <SortByDate sortPosts={sortPosts} selectedSort={selectedSort} />
      </ButtonGroup>
    </Flex>
  );
};

export default SortButtons;
