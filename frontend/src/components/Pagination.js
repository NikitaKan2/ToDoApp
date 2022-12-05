/* eslint-disable object-curly-newline */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */
import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  List,
  ListItem,
} from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const [currentPages, setCurrentPages] = useState([]);

  const pageNumbers = useMemo(() => {
    const numbresForPage = [];

    for (let i = 0; i < totalPages; i += 1) {
      numbresForPage.push(i + 1);
    }
    return numbresForPage;
  }, [totalPages]);

  useEffect(() => {
    if (currentPage <= 2) {
      setCurrentPages(pageNumbers.slice(0, 3));
    } else {
      const pages = pageNumbers.slice(currentPage - 2, currentPage + 2);
      setCurrentPages(pages);
    }
  }, [currentPage, pageNumbers]);

  return (
    <List display={totalPages > 1 ? 'flex' : 'none'} alignItems="center" justifyContent="center">
      {currentPage === 1
        ? null
        : (
          <Button
            _active={{
              background: '#0077b6',
            }}
            _hover={{
              background: '#0077b6',
            }}
            background="#0096c7"
            type="button"
            onClick={() => paginate(pageNumbers[0])}
            mr={5}
            leftIcon={<ArrowLeftIcon color="white" w={5} h={5} />}
          />
        )}
      {currentPages.map((number) => (
        <ListItem key={number} mr={5}>
          <Button
            _active={{
              background: '#0077b6',
            }}
            _hover={{
              background: '#0077b6',
            }}
            isActive={currentPage === number}
            background="#0096c7"
            type="button"
            color="white"
            onClick={() => paginate(number)}
          >
            {number}
          </Button>
        </ListItem>
      ))}
      {currentPage === pageNumbers[pageNumbers.length - 1]
        ? null
        : (
          <Button
            _active={{
              background: '#0077b6',
            }}
            _hover={{
              background: '#0077b6',
            }}
            background="#0096c7"
            type="button"
            onClick={() => paginate(pageNumbers[pageNumbers.length - 1])}
            rightIcon={<ArrowRightIcon color="white" w={5} h={5} />}
          />
        )}
    </List>
  );
};

export default Pagination;
