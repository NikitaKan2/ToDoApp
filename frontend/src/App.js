import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ChakraProvider } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import TodoList from './components/TodoList';
import { tasksClient } from './services';

tasksClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const notify = () => {
      toast.error(`${error.response.data.error}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    };
    notify();
  },
);

const App = () => (
  <ChakraProvider>
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
  </ChakraProvider>
);

export default App;
