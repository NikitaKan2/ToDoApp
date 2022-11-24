/* eslint-disable max-len */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import {
  Box, Button, Input, Text,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import uniqid from 'uniqid';
import { patchTask } from '../services';

const Todo = ({
  buttonDisabled, todos, completeTodo, removeTodo,
}) => {
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleKeyDown = async (e, todo) => {
    if (e.keyCode === 27) {
      setTodoEditing(null);
    }
    if (e.keyCode === 13) {
      todo.name = editingText;
      await patchTask(todo);
      setTodoEditing(null);
      setEditingText('');
    }
  };

  return (
    <Box
      className="todo-container"
    >
      {todos.length ? (
        todos.map((todo) => (
          <Box
            _hover={{
              background: '#48cae4',
            }}
            background="#023e8a"
            key={uniqid()}
            className={todo.done ? 'todo-complete' : 'todo'}
          >
            <Box className="left-container">
              <Box className="container-icon">
                <Button
                  height="100%"
                  _hover={{
                    background: '#03045e',
                  }}
                  background="teal"
                  isDisabled={buttonDisabled}
                  onClick={() => completeTodo(todo)}
                  alignSelf="stretch"
                  borderRadius="5px 0px 0px 5px"
                  minHeight="65px"
                >
                  <CheckIcon color="#80ed99" />
                </Button>
              </Box>
              {todoEditing === todo.uuid ? (
                <Input
                  size="md"
                  type="title"
                  autoFocus
                  className="task-input-edit"
                  placeholder="I want to..."
                  name="title"
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, todo)}
                  value={editingText}
                />
              ) : (
                <Box
                  onClick={() => setTodoEditing(todo.uuid)}
                  className="todo-text"
                  key={todo.uuid}
                >
                  {todo.name}
                </Box>
              )}
            </Box>
            <Box className="right-container">
              <Box
                className="todo-date"
                key={todo.uuid}
              >
                {todo.createdAt.replaceAll('-', '/').slice(0, 10)}
              </Box>
              <Box alignSelf="stretch">
                <Button
                  _hover={{
                    background: '#03045e',
                  }}
                  background="#0077b6"
                  isDisabled={buttonDisabled}
                  onClick={() => removeTodo(todo.uuid)}
                  alignSelf="stretch"
                  borderRadius="0px 5px 5px 0px"
                  minHeight="65px"
                >
                  <CloseIcon color="red" />
                </Button>
              </Box>
            </Box>
          </Box>
        ))
      )

        : (<Text color="gray.500" fontSize="40px">Todo not added yet!</Text>)}
    </Box>

  );
};

export default Todo;
