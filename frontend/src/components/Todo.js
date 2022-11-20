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

const Todo = ({ filters, currentFilter, handleSetFilter, sortPosts, todos, completeTodo, removeTodo }) => {
  const [edit, setEdit] = useState(false);

  const handleUpdate = (e, id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    const todoToUpdate = todos[index];
    todoToUpdate.title = e.target.value;
    setEdit(false);
  };

  const handleKeyDown = (e, id) => {
    if (e.keyCode === 27) {
      setEdit(false);
    }
    if (e.keyCode === 13) {
      handleUpdate(e, id);
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
                    {edit ? (
                      <input
                        autoFocus
                        type="title"
                        placeholder="I want to..."
                        name="title"
                        onKeyDown={(e) => handleKeyDown(e, todo.id)}
                        defaultValue={todo.title}
                      />
                    ) : (
                      <div
                        onClick={() => setEdit(true)}
                        className="todo-text"
                        key={todo.id}
                      >
                        {todo.title}
                      </div>
                    )}
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
