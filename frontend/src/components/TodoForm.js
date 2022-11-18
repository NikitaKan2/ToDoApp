import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import uniqid from 'uniqid';

const TodoForm = ({ onSubmit, edit, setEdit }) => {
  const [input, setInput] = useState(edit ? edit.title : '');

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

    onSubmit({
      id: uniqid(),
      title: input,
      completed: false,
      date: new Date().toLocaleDateString('ru-RU'),
      dateForSort: Date.now(),
    });

    setInput('');
  };

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setEdit({
        id: null,
        title: '',
        state: false,
      });
    }
  }, [setEdit]);

  useEffect(() => {
    const inputEl = inputRef.current;
    inputEl.addEventListener('keydown', escFunction);

    return () => {
      inputEl.removeEventListener('keydown', escFunction);
    };
  }, [escFunction]);

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {edit ? (
        <>
          <input
            type="title"
            placeholder="I want to..."
            value={input}
            name="title"
            className="task-input"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="form-button" type="submit">Update Todo</button>
        </>
      ) : (
        <>
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
        </>
      )}
    </form>
  );
};

export default TodoForm;
