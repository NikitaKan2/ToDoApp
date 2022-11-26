/* eslint-disable object-curly-newline */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */
import React, { useMemo } from 'react';
import {
  Button,
  List,
  ListItem,
} from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = useMemo(() => {
    const numbresForPage = [];

    for (let i = 0; i < totalPages; i += 1) {
      numbresForPage.push(i + 1);
    }
    return numbresForPage;
  }, [totalPages]);

  const className = totalPages > 1 ? 'pagination' : 'pagination-none';

  return (
    <List className={className}>
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
            className="button-to-left"
            leftIcon={<ArrowLeftIcon color="white" w={5} h={5} />}
          />
        )}
      {pageNumbers.map((number) => (
        <ListItem key={number} className="page-item">
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
            className="page-link"
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
            className="button-to-right"
            rightIcon={<ArrowRightIcon color="white" w={5} h={5} />}
          />
        )}
    </List>
  );
};

export default Pagination;
