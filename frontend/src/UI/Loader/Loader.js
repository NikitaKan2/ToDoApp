import React from 'react';
import { CircularProgress } from '@chakra-ui/react';

const Loader = () => (
  <CircularProgress isIndeterminate color="green.300" size="120px" top="300px" position="fixed" zIndex="100" />
);

export default Loader;
