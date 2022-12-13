/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();
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

  const handleClickButton = () => {
    localStorage.removeItem('token');
    navigate('/');
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
    <Box
      maxW="1500px"
      margin="0 auto"
      minH="100vh"
      textAlign="center"
      backgroundColor="rgb(245, 242, 242)"
      boxShadow="2px 1px 62px 13px rgba(34, 60, 80, 0.25)"
    >
      <Button
        ml="65vw"
        _hover={{
          background: '#0077b6',
        }}
        color="white"
        type="button"
        background="#0096c7"
        mt={5}
        onClick={handleClickButton}
      >
        Logout

      </Button>
      <Box
        display="flex"
        margin="0 auto"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        maxWidth="600px"
      >
        <Text as="h1" fontSize={40} color="gray.500">TodoList</Text>
        <TodoForm addTodo={addTodo} />
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
