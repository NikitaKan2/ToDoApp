import React, { useState, useEffect, useRef } from 'react';

const TodoForm = (props) => {
  const { edit } = props;

  const [input, setInput] = useState(edit ? edit.value : '');

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
      id: Date.now(),
      text: input,
    });

    setInput('');
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit}>
      {edit ? (
        <>
          <input
            type="text"
            placeholder="Update Todo"
            value={input}
            name="text"
            className="taskInput"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="formButton" type="submit">Update Todo</button>
        </>
      )
        : (
          <>
            <input
              type="text"
              placeholder="I want to..."
              value={input}
              name="text"
              className="taskInput"
              onChange={handleChange}
              ref={inputRef}
            />
            <button className="formButton" type="submit">Add todo</button>
          </>
        )}
    </form>
  );
};

export default TodoForm;
