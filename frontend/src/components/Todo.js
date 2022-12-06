/* eslint-disable max-len */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import {
  Box, Button, Flex, Input,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { patchTask } from '../services';

const Todo = ({
  todo, buttonDisabled, completeTodo, removeTodo,
}) => {
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleDoubleClick = (id) => {
    setTodoEditing(id);
  };

  const handleKeyDown = async (e, task) => {
    if (e.keyCode === 27) {
      setTodoEditing(null);
    }
    if (e.keyCode === 13) {
      task.name = editingText;
      await patchTask(task);
      setTodoEditing(null);
      setEditingText('');
    }
  };

  return (
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
            leftIcon={<CheckIcon w={5} h={5} color={todo.done ? 'blackAlpha.300' : '#80ed99'} />}
            isDisabled={buttonDisabled}
            alignSelf="stretch"
            onClick={() => completeTodo(todo)}
          />
        </Box>
        {todoEditing === todo.id ? (
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
            onDoubleClick={() => handleDoubleClick(todo.id)}
            className="todo-text"
            key={todo.id}
            maxWidth="100%"
            wordBreak="break-all"
          >
            {todo.name}
          </Box>
        )}
      </Box>
      <Flex align="center" alignSelf="stretch">
        <Box
          pr={3}
          wordBreak="break-all"
          key={todo.id}
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
            rightIcon={<CloseIcon color="red" />}
            isDisabled={buttonDisabled}
            onClick={() => removeTodo(todo.id)}
            alignSelf="stretch"
            borderRadius="0px 5px 5px 0px"
            minHeight="65px"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Todo;
