/* eslint-disable max-len */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import {
  Box, Button, Input, Text, Stack,
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
    <Stack
      mb="15px"
      direction="column"
      spacing={4}
      width="100%"
    >
      {todos.length ? (
        todos.map((todo) => (
          <Box
            alignItems="center"
            justifyContent="space-between"
            background={todo.done ? 'grey' : 'rgb(242, 242, 242)'}
            textDecoration={todo.done ? 'line-through' : ''}
            display="flex"
            w="100%"
            p={4}
            borderRadius={15}
            boxShadow="4px 4px 18px 9px rgba(0, 144, 255, 0.2);"
            key={uniqid()}
          >
            <Box
              display="flex"
              alignItems="center"
            >
              <Box>
                <Button
                  _active={{
                    background: 'inherit',
                  }}
                  _hover={{
                    background: 'inherit',
                  }}
                  backgroundColor="inherit"
                  leftIcon={<CheckIcon w={5} h={5} color={todo.done ? 'blackAlpha.300' : '#80ed99'} className="complete-icon" />}
                  isDisabled={buttonDisabled}
                  alignSelf="stretch"
                  onClick={() => completeTodo(todo)}
                />
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
                  maxWidth="100%"
                  wordBreak="break-all"
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
              <Box>
                <Button
                  _active={{
                    background: 'inherit',
                  }}
                  _hover={{
                    background: 'inherit',
                  }}
                  backgroundColor="inherit"
                  rightIcon={<CloseIcon color="red" className="delete-icon" />}
                  isDisabled={buttonDisabled}
                  onClick={() => removeTodo(todo.uuid)}
                  alignSelf="stretch"
                  borderRadius="0px 5px 5px 0px"
                  minHeight="65px"
                />
              </Box>
            </Box>
          </Box>
        ))
      )

        : (<Text color="gray.500" fontSize="40px">Todo not added yet!</Text>)}
    </Stack>

  );
};

export default Todo;
