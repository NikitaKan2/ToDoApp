/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import Pagination from './Pagination';

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
  const [currentFilter, setCurrentFilter] = useState(filters.ALL.value);
  const postsPerPage = 5;

  const filterTasks = (tasks) => {
    if (currentFilter === 'all') {
      return tasks;
    }
    return tasks.filter((task) => task.completed === currentFilter);
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  const handleSetFilter = (value) => {
    setCurrentFilter(value);
  };

  const sortedTodo = () => {
    if (selectedSort === 'up') {
      return [...todos].sort((a, b) => a.dateForSort - b.dateForSort);
    }
    if (selectedSort === 'down') {
      return [...todos].sort((a, b) => b.dateForSort - a.dateForSort);
    }
    return todos;
  };

  const handleSort = (sort) => {
    setSelectedSort(sort);
  };

  const addTodo = (todo) => {
    if (!todo.title) {
      return;
    }

    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removeArr);
  };

  const completeTodo = (id) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updateTodos);
  };

  const filteredTodos = useMemo(() => {
    const sortedPosts = sortedTodo();
    return filterTasks(sortedPosts);
  }, [currentPage, todos, selectedSort, currentFilter]);

  const currentPosts = useMemo(() => {
    const lastIndex = currentPage * postsPerPage;
    const firstIndex = lastIndex - postsPerPage;
    const todosToPage = filteredTodos.slice(firstIndex, lastIndex);
    return todosToPage;
  }, [currentPage, todos, selectedSort, currentFilter]);

  return (
    <div className="todo-container">
      <h1 className="todo-list-header">TodoList</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        filters={filters}
        currentFilter={currentFilter}
        handleSetFilter={handleSetFilter}
        sortPosts={handleSort}
        todos={currentPosts}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        selectedSort={selectedSort}
      />
      <Pagination setCurrentPage={handlePageChange} postsPerPage={postsPerPage} totalPosts={filteredTodos.length} paginate={handlePageChange} />
    </div>
  );
};

export default TodoList;
