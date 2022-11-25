import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { Box, Text } from '@chakra-ui/react';

const SortByDate = ({ sortPosts, selectedSort }) => (
  <Box className="container-sort-arrows" background="#0096c7">
    <Text className="text-sort">Sort By Date</Text>
    <ArrowUpIcon w={5} h={5} focusable onClick={() => sortPosts('asc')} className={selectedSort === 'asc' ? 'arrow-up-active' : 'arrow-up'} />
    <ArrowDownIcon w={5} h={5} focusable onClick={() => sortPosts('desc')} className={selectedSort === 'desc' ? 'arrow-down-active' : 'arrow-down'} />
  </Box>
);

export default SortByDate;
