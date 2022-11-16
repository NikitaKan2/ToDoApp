import React, { useState, useEffect, useRef } from 'react';
import uniqid from 'uniqid';

const TodoForm = (props) => {
  const [input, setInput] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { onSubmit } = props;
    onSubmit({
      id: uniqid(),
      title: input,
      completed: false,
      status: 'all',
      date: new Date().toLocaleDateString('ru-RU'),
      dateForSort: Date.now(),
    });

    setInput('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="title"
        placeholder="I want to..."
        value={input}
        name="title"
        className="task-input"
        onChange={handleChange}
        ref={inputRef}
      />
      <button className="form-button" type="submit">Add todo</button>
    </form>
  );
};

export default TodoForm;
