import React, { useState } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import Pagination from './Pagination';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=50');
  //     setTodos(res.data);
  //   };

  //   fetchPosts();
  // }, []);

  // pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = todos.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const addTodo = (todo) => {
    if (!todo.title) {
      return;
    }

    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removeArr);
  };

  const completeTodo = (id) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updateTodos);
  };

  return (
    <div className="todoContainer">
      <h1 className="todoListHeader">TodoList</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={currentPosts}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
      />
      <Pagination postsPerPage={postsPerPage} totalPosts={todos.length} paginate={paginate} />
    </div>
  );
};

export default TodoList;
