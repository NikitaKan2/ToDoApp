/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line jsx-a11y/no-static-element-interactions
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import uniqid from 'uniqid';
import SortByData from './SortByData';

const Todo = ({ todos, completeTodo, removeTodo }) => {
  // const filters = {
  //   ALL: {
  //     value: 'ALL',
  //   },
  //   DONE: {
  //     value: 'ALL',
  //   },
  //   UNDONE: {
  //     value: 'UNDONE',
  //   },
  // };

  // const [currentFilter, setCurrentFilter] = useState(filters.ALL);
  const [filtered, setFiltered] = useState(todos);
  const [selectedSort, setSelectedSort] = useState('');

  // useEffect(() => {
  //   setFiltered(todos);
  // }, [todos]);

  // const todoFilter = (value) => {
  //   if (value === 'all') {
  //     setFiltered(todos);
  //   } else {
  //     const newTodo = [...todos].filter((todo) => todo.completed === status);
  //     setFiltered(newTodo);
  //   }
  // };

  // const handleCurrentFilter = (value) => {
  //   console.log(value)
  //   todoFilter(value);
  //   setCurrentFilter(value);
  // };

  const sortPosts = (sort) => {
    setSelectedSort(sort);
    if (sort === 'up') {
      const newTodos = [...filtered].sort((a, b) => a.dateForSort - b.dateForSort);
      setFiltered(newTodos);
    }
    if (sort === 'down') {
      const newTodos = [...filtered].sort((a, b) => b.dateForSort - a.dateForSort);
      setFiltered(newTodos);
    }
  };

  return (
    <>
      <div className="sort-button-container">
        {/* <div className="buttons">
          {Object.values(filters).map((value) => (
            <button
              key={uniqid()}
              className="sort-button"
              type="button"
              onClick={() => handleCurrentFilter(value.state)}
            >
              {value.state}
            </button>
          ))}
        </div> */}
        <SortByData value={selectedSort} sortPosts={sortPosts} />
      </div>
      <div className="todo-container">
        {todos.length ? (
          filtered.map((todo) => (
            <div
              className={todo.completed ? 'todo-complete' : 'todo'}
              key={uniqid()}
            >
              <div className="left-container">
                <div className="container-icon">
                  <MdDone className="icon-done" onClick={() => completeTodo(todo.id)} />
                </div>
                <div
                  className="todo-text"
                  key={todo.id}
                >
                  {todo.title}
                </div>
              </div>
              <div className="right-container">
                <div
                  className="todo-date"
                  key={todo.id}
                >
                  {todo.date}
                </div>
                <div className="icons">
                  <AiOutlineClose className="icon-close" onClick={() => removeTodo(todo.id)} />
                </div>
              </div>
            </div>
          ))
        )
          : (<h1 className="not-add">Todo not added yet!</h1>)}
      </div>
    </>
  );
};
export default Todo;
