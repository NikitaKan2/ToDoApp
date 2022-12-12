/* eslint-disable react/jsx-no-useless-fragment */
import React, { useContext, useState } from 'react';
import {
  Input, FormLabel, Button, ButtonGroup, Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { registrUser, loginUser } from '../services';
import authContext from '../context/index';

const Form = () => {
  const { setIsAuth } = useContext(authContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [form, setForm] = useState('signIn');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    try {
      if (form === 'signIn') {
        e.preventDefault();
        const user = {
          name,
          password,
        };
        const data = await loginUser(user);
        localStorage.setItem('token', data.accessToken);
        setIsAuth(true);
        navigate('/tasks');
      }
      if (form === 'signUp') {
        e.preventDefault();
        const user = {
          name,
          password,
        };
        const data = await registrUser(user);
        localStorage.setItem('token', data.accessToken);
        setIsAuth(true);
        navigate('/tasks');
      }
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <>
      <form className="auth-from" onSubmit={(e) => handleSubmit(e)}>
        <FormLabel fontSize={20} display="flex" justifyContent="center" alignContent="center">Go to you Todo list!</FormLabel>
        <Input mb={5} borderColor="black" type="name" value={name} onChange={handleNameChange} />
        <Input mb={5} borderColor="black" type="password" value={password} onChange={handlePasswordChange} />
        {error && <Text color="red">{error}</Text>}
        <ButtonGroup mt={5} display="flex" alignItems="center" justifyContent="center">
          <Button colorScheme="teal" type="submit" mr={5} onClick={() => setForm('signUp')}>Registration</Button>
          <Button colorScheme="teal" type="submit" onClick={() => setForm('signIn')}>Login</Button>
        </ButtonGroup>
      </form>
    </>
  );
};

export default Form;
