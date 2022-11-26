import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { Box, Button, Text } from '@chakra-ui/react';

const SortByDate = ({ sortPosts, selectedSort }) => (
  <Box className="container-sort-arrows" background="#0096c7">
    <Text className="text-sort">Sort By Date</Text>
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
        p={2}
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
        p={2}
        rightIcon={<ArrowUpIcon w={5} h={5} focusable onClick={() => sortPosts('asc')} color="greenyellow" />}
      />
    )}
  </Box>
);

export default SortByDate;
