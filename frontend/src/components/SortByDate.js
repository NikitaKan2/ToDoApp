import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { Box, Button, Text } from '@chakra-ui/react';

const SortByDate = ({ sortPosts, selectedSort }) => (
  <Box display="flex" maxH="40px" borderRadius={5} alignItems="center" background="#0096c7">
    <Text pl="5px" fontWeight="bold" color="white">Sort By Date</Text>
    {selectedSort === 'asc' ? (
      <Button
        alignItems="center"
        justifyContent="center"
        _active={{
          background: '#0096c7',
        }}
        _hover={{
          background: '#0096c7',
        }}
        background="#0096c7"
        rightIcon={<ArrowDownIcon w={5} h={5} focusable onClick={() => sortPosts('desc')} color="red" />}
      />
    ) : (
      <Button
        alignItems="center"
        justifyContent="center"
        _active={{
          background: '#0096c7',
        }}
        _hover={{
          background: '#0096c7',
        }}
        background="#0096c7"
        rightIcon={<ArrowUpIcon w={5} h={5} focusable onClick={() => sortPosts('asc')} color="greenyellow" />}
      />
    )}
  </Box>
);

export default SortByDate;
