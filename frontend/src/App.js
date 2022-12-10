import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import TodoList from './pages/tasksPage';
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
  req.id = localStorage.getItem('uuid');
  return req;
}, (error) => error);

axios.interceptors.request.use((req) => {
  req.headers.authorization = localStorage.getItem('token');
  req.id = localStorage.getItem('uuid');
  return req;
}, (error) => error);

const App = () => (
  <>
    <ChakraProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/tasks" element={<TodoList />} />
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

export default App;
