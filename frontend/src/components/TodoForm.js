/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Button, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { postTask } from '../services';

const TodoForm = ({ addTodo }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (values) => {
    const oldTask = {
      name: values.name,
      done: false,
    };
    const newTask = await postTask(oldTask);
    addTodo(newTask);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="task-form">
      <Input
        borderColor="black"
        background="gray.100"
        color="teal"
        marginRight="5px"
        focusBorderColor="teal.400"
        placeholder="Add todo..."
        defaultValue=""
        {...register('name', { required: true })}
        _placeholder={{ opacity: 0.5, color: 'black' }}
        autoFocus
      />
      <Button
        _hover={{
          background: '#0077b6',
        }}
        background="#0096c7"
        variant="solid"
        type="submit"
        color="white"
      >
        Add Todo
      </Button>
    </form>
  );
};

export default TodoForm;
