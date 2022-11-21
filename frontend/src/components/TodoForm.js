import axios from 'axios';
import React, {
  useState, useEffect, useRef,
} from 'react';

import routes from '../routes';

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

    try {
      const task = {
        name: input,
        done: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const response = await axios.post(routes.postTask(), task, { headers: { 'Content-Type': 'application/json' } });
      onSubmit(response.data);
    } catch (error) {
      console.log(error.message);
    }
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
