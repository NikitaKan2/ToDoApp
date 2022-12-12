import React, { useState } from 'react';
import {
  Input, FormLabel, Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services';

const Form = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name,
      password,
    };
    const data = await loginUser(user);
    localStorage.setItem('token', data.accessToken);
    navigate('/tasks');
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <FormLabel>Login</FormLabel>
      <Input mb={5} borderColor="black" type="name" value={name} onChange={handleNameChange} />
      <Input mb={5} borderColor="black" type="password" value={password} onChange={handlePasswordChange} />
      <Button colorScheme="teal" type="submit">Login</Button>
    </form>
  );
};

export default Form;
