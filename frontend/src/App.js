import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import TodoList from './components/TodoList';

const App = () => (
  <div className="App">
    <TodoList />
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </div>
);

export default App;
