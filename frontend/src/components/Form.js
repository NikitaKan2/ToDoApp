/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from 'react';
import {
  Input, FormLabel, Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { registrUser } from '../services';

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
    const data = await registrUser(user);
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('uuid', data.uuid);
    navigate('/tasks');
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormLabel>Registration</FormLabel>
        <Input mb={5} borderColor="black" type="name" value={name} onChange={handleNameChange} />
        <Input mb={5} borderColor="black" type="password" value={password} onChange={handlePasswordChange} />
        <Button colorScheme="teal" type="submit">Registration</Button>
      </form>
    </>
  );
};

export default Form;
