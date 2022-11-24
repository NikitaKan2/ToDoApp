/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Button, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { postTask } from '../services';

const TodoForm = ({ isLoading, addTodo }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (values) => {
    const oldTask = {
      name: values.name,
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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
        colorScheme="teal"
        variant="solid"
        type="submit"
        isLoading={isLoading}
      >
        Add Todo
      </Button>
    </form>
  );
};

export default TodoForm;
