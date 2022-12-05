import React, { useState } from 'react';
import { Stack, Text } from '@chakra-ui/react';
import uniqid from 'uniqid';
import { patchTask, deleteTask } from '../services';
import Todo from './Todo';

const Todos = ({
  getTasks, todos, handleChangeTodos,
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const removeTodo = async (id) => {
    setButtonDisabled(true);
    await deleteTask(id);
    await getTasks();
    setButtonDisabled(false);
  };

  const completeTodo = async (todo) => {
    setButtonDisabled(true);
    const { id } = todo;
    const updateTodos = todos.map((post) => {
      if (post.id === id) {
        post.done = !post.done;
      }
      return post;
    });
    await patchTask(todo);
    handleChangeTodos(updateTodos);
    setButtonDisabled(false);
  };

  return (
    <Stack
      mb="15px"
      direction="column"
      spacing={4}
      width="100%"
    >
      {todos.length ? (
        todos.map((todo) => (
          <Todo
            key={uniqid()}
            todo={todo}
            buttonDisabled={buttonDisabled}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))
      )
        : (
          <Text color="gray.500" fontSize={40}>Todo not added yet!</Text>
        )}
    </Stack>
  );
};

export default Todos;
