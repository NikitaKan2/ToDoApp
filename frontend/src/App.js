/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import RegistrationPage from './pages/RegistrationPage';
import TodoList from './pages/TasksPage';
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

tasksClient.interceptors.request.use((req) => {
  req.headers.authorization = localStorage.getItem('token');
  return req;
}, (error) => error);

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/tasks" element={token ? <TodoList /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ChakraProvider>
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

    </>
  );
};

export default App;
