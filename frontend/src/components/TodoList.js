/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import Pagination from './Pagination';
import {
  deleteTask, fetchAllTasks, getPagesCount, patchTask,
} from '../services';
import Loader from '../UI/Loader/Loader';

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
  const [selectedSort, setSelectedSort] = useState('desc');
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

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  const handleSetFilter = (value) => {
    setCurrentFilter(value);
  };

  const handleSort = (sort) => {
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

  const removeTodo = async (uuid) => {
    await deleteTask(uuid);
    await getTasks();
  };

  const completeTodo = async (todo) => {
    const { uuid } = todo;
    const updateTodos = todos.map((post) => {
      if (post.uuid === uuid) {
        post.done = !post.done;
      }
      return post;
    });
    await patchTask(todo);
    setTodos(updateTodos);
  };

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
            todos={todos}
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
