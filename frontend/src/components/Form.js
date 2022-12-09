/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from 'react';
import {
  Input, FormLabel, Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { registrUser } from '../services';

const Form = () => {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [auth, setAuth] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name,
      password,
    };
    console.log(user);
    await registrUser(user);
    setAuth(true);
  };

  return (
    <>
      {auth
        ? <Link to="/tasks">Go to Tasks</Link>
        : (
          <form onSubmit={(e) => handleSubmit(e)}>
            <FormLabel>Login</FormLabel>
            <Input mb={5} borderColor="black" type="name" value={name} onChange={handleNameChange} />
            <Input mb={5} borderColor="black" type="password" value={password} onChange={handlePasswordChange} />
            <Button colorScheme="teal" type="submit">Submit</Button>
          </form>
        )}
    </>
  );
};

export default Form;
