/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Todo from './Todo';
import TodoForm from './TodoForm';
import Pagination from './Pagination';
import routes from '../routes';
import Loader from '../UI/Loader/Loader';

const TodoList = () => {
  const filters = {
    ALL: {
      value: 'all',
      name: 'All',
    },
    DONE: {
      value: true,
      name: 'Done',
    },
    UNDONE: {
      value: false,
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

  const getPagesCount = (totalPagesPagination) => Math.ceil(totalPagesPagination / postsPerPage);

  const fetchTasks = async (pp, page) => {
    setLoading(true);
    const response = await axios.get(routes.getAllTasks(), {
      params: {
        pp,
        page,
      },
    });
    setTotalPages(getPagesCount(response.data.count));
    if (currentPage > 1 && response.data.tasks.length === 0) {
      setCurrentPage(currentPage - 1);
    }
    setTodos(response.data.tasks);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks(postsPerPage, currentPage);
  }, [currentPage]);

  const filterTasks = (tasks) => {
    if (currentFilter === 'all') {
      return tasks;
    }
    return tasks.filter((task) => task.done === currentFilter);
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  const handleSetFilter = (value) => {
    setCurrentFilter(value);
  };

  const sortedTodo = () => {
    if (selectedSort === 'up') {
      return [...todos].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    }
    if (selectedSort === 'down') {
      return [...todos].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
    return todos;
  };

  const handleSort = (sort) => {
    setSelectedSort(sort);
  };

  const addTodo = async (todo) => {
    if (!todo.name) {
      return;
    }
    const newTodos = [...todos, todo];
    setTodos(newTodos);
  };

  const removeTodo = async (uuid) => {
    await axios.delete(routes.deleteTask(uuid));
    fetchTasks(postsPerPage, currentPage);
  };

  const completeTodo = async (todo) => {
    const { uuid } = todo;
    const updateTodos = todos.map((post) => {
      if (post.uuid === uuid) {
        post.done = !post.done;
      }
      return post;
    });
    await axios.patch(routes.updateTask(uuid), todo);
    setTodos(updateTodos);
  };

  const filteredTodos = useMemo(() => {
    const sortedPosts = sortedTodo();
    const filteredTasks = filterTasks(sortedPosts);
    return filteredTasks;
  }, [currentPage, todos, selectedSort, currentFilter]);

  // const currentPosts = useMemo(() => {
  //   const lastIndex = currentPage * postsPerPage;
  //   const firstIndex = lastIndex - postsPerPage;
  //   const todosToPage = filteredTodos.slice(firstIndex, lastIndex);
  //   console.log(todosToPage);
  //   return todosToPage;
  // }, [currentPage, todos, selectedSort, currentFilter]);

  // useEffect(() => {
  //   if (currentPosts.length === 0 && currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // }, [currentPosts]);

  return (
    <div className="todo-container">
      <h1 className="todo-list-header">TodoList</h1>
      <TodoForm onSubmit={addTodo} />
      {isLoading ? <Loader />
        : (
          <Todo
            filters={filters}
            currentFilter={currentFilter}
            handleSetFilter={handleSetFilter}
            sortPosts={handleSort}
            todos={filteredTodos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            selectedSort={selectedSort}
          />
        )}
      <Pagination currentPage={currentPage} totalPages={totalPages} paginate={handlePageChange} />
    </div>
  );
};

export default TodoList;
