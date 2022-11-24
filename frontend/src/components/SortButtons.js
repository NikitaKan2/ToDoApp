import React from 'react';
import { Box, ButtonGroup, Button } from '@chakra-ui/react';
import uniqid from 'uniqid';
import SortByDate from './SortByData';

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
    <Box className="sort-button-container">
      <ButtonGroup spacing={3} direction="row" align="center" justifyContent="center">
        {Object.values(filters).map(({ value, name }) => (
          <Button
            key={uniqid()}
            colorScheme="teal"
            variant="solid"
            isActive={currentFilter === value}
            className="sort-button"
            type="button"
            onClick={() => handleSetFilter(value)}
          >
            {name}
          </Button>
        ))}
        <SortByDate sortPosts={sortPosts} selectedSort={selectedSort} />
      </ButtonGroup>
    </Box>
  );
};

export default SortButtons;
