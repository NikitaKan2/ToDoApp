/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import TodoForm from './TodoForm';
import Pagination from './Pagination';
import {
  fetchAllTasks, getPagesCount,
} from '../services';
import Loader from '../UI/Loader/Loader';
import SortButtons from './SortButtons';
import Todos from './Todos';

const TodoList = () => {
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

  const [todos, setTodos] = useState([]);
  const [selectedSort, setSelectedSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(filters.ALL.value);
  const postsPerPage = 5;

  const getTasks = async () => {
    setLoading(true);
    const { count, tasks } = await fetchAllTasks({
      postsPerPage, currentPage, selectedSort, currentFilter,
    });
    setTotalPages(getPagesCount(count, postsPerPage));
    if (currentPage > 1 && tasks.length === 0) {
      setCurrentPage(currentPage - 1);
    }
    setTodos(tasks);
    setLoading(false);
  };

  const handleChangeTodos = (tasks) => {
    setTodos(tasks);
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  const handleSetFilter = (value) => {
    setCurrentFilter(value);
  };

  const handleSetSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    getTasks();
  }, [currentFilter, currentPage, selectedSort]);

  const addTodo = async (todo) => {
    if (!todo.name) {
      return;
    }
    getTasks();
  };

  return (
    <Box className="container">
      <Box className="todo-container">
        <Text className="todo-list-header" color="gray.500">TodoList</Text>
        <TodoForm isLoading={isLoading} addTodo={addTodo} />
        <SortButtons
          sortPosts={handleSetSort}
          selectedSort={selectedSort}
          currentFilter={currentFilter}
          handleSetFilter={handleSetFilter}
        />
        {isLoading ? <Loader /> : null}
        <Todos
          getTasks={getTasks}
          todos={todos}
          handleChangeTodos={handleChangeTodos}
        />
        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={handlePageChange} />
      </Box>
    </Box>
  );
};

export default TodoList;
