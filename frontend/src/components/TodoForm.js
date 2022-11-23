import React, {
  useState, useEffect, useRef,
} from 'react';

import { postTask } from '../services';

const TodoForm = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const oldTask = {
      name: input,
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const newTask = await postTask(oldTask);
    onSubmit(newTask);
    setInput('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="name"
        placeholder="I want to..."
        value={input}
        name="name"
        className="task-input"
        onChange={handleChange}
        ref={inputRef}
      />
      <button className="form-button" type="submit">Add todo</button>
    </form>
  );
};

export default TodoForm;
