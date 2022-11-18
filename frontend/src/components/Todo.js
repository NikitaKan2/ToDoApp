/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line jsx-a11y/no-static-element-interactions
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import uniqid from 'uniqid';
import SortByDate from './SortByData';
import TodoForm from './TodoForm';

const Todo = ({ filters, currentFilter, handleSetFilter, sortPosts, todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    title: '',
    state: false,
  });

  const submitUpdate = (title) => {
    updateTodo(edit.id, title);
    setEdit({
      id: null,
      title: '',
      state: false,
    });
  };

  if (edit.state) {
    return <TodoForm edit={edit} setEdit={setEdit} onSubmit={submitUpdate} />;
  }

      return (
        <>
          <div className="sort-button-container">
            <div className="buttons">
              {Object.values(filters).map(({ value, name }) => (
                <button
                  key={uniqid()}
                  className={currentFilter === value ? 'sort-button-active' : 'sort-button'}
                  type="button"
                  onClick={() => handleSetFilter(value)}
                >
                  {name}
                </button>
            ))}
            </div>
            <SortByDate sortPosts={sortPosts} />
          </div>
          <div
            className="todo-container"
          >
            {todos.length ? (
              todos.map((todo) => (
                <div
                  key={uniqid()}
                  className={todo.completed ? 'todo-complete' : 'todo'}
                >
                  <div className="left-container">
                    <div className="container-icon">
                      <MdDone className="icon-done" onClick={() => completeTodo(todo.id)} />
                    </div>
                    <div
                      onClick={() => setEdit({ id: todo.id, title: todo.title, state: true })}
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
