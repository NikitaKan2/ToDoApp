/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import uniqid from 'uniqid';
import SortByDate from './SortByData';
import { patchTask } from '../services';

const Todo = ({
  filters, currentFilter, handleSetFilter, sortPosts, todos, completeTodo, removeTodo, selectedSort,
}) => {
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleKeyDown = async (e, todo) => {
    if (e.keyCode === 27) {
      setTodoEditing(null);
    }
    if (e.keyCode === 13) {
      todo.name = editingText;
      await patchTask(todo);
      setTodoEditing(null);
      setEditingText('');
    }
  };

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
        <SortByDate sortPosts={sortPosts} selectedSort={selectedSort} />
      </div>
      <div
        className="todo-container"
      >
        {todos.length ? (
          todos.map((todo) => (
            <div
              key={uniqid()}
              className={todo.done ? 'todo-complete' : 'todo'}
            >
              <div className="left-container">
                <div className="container-icon">
                  <MdDone className="icon-done" onClick={() => completeTodo(todo)} />
                </div>
                {todoEditing === todo.uuid ? (
                  <input
                    autoFocus
                    type="title"
                    className="task-input-edit"
                    placeholder="I want to..."
                    name="title"
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, todo)}
                    value={editingText}
                  />
                ) : (
                  <div
                    onClick={() => setTodoEditing(todo.uuid)}
                    className="todo-text"
                    key={todo.uuid}
                  >
                    {todo.name}
                  </div>
                )}
              </div>
              <div className="right-container">
                <div
                  className="todo-date"
                  key={todo.uuid}
                >
                  {todo.createdAt.replaceAll('-', '/').slice(0, 10)}
                </div>
                <div className="icons">
                  <AiOutlineClose className="icon-close" onClick={() => removeTodo(todo.uuid)} />
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
