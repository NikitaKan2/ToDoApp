/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line jsx-a11y/no-static-element-interactions
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import TodoForm from './TodoForm';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return (
    <div className="todoContainer">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div
            className={todo.isComplete ? 'todo-complete' : 'todo'}
            key={Math.floor(Math.random() * 2000)}
          >
            <div className="doneIcon">
              <MdDone className="iconDone" onClick={() => completeTodo(todo.id)} />
            </div>
            <div
              className="todoText"
              key={todo.id}
            >
              {todo.text}
            </div>
            <div className="icons">
              <AiOutlineEdit className="iconEdit" onClick={() => setEdit({ id: todo.id, value: todo.text })} />
              <AiOutlineClose className="iconClose" onClick={() => removeTodo(todo.id)} />
            </div>
          </div>
        ))
      )
        : (<h1 className="notAdd">Todo not added yet!</h1>)}
    </div>
  );
};
export default Todo;
