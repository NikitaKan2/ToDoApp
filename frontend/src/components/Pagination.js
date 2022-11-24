/* eslint-disable object-curly-newline */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */
import React, { useMemo } from 'react';
import {
  Button,
  List,
  ListItem,
} from '@chakra-ui/react';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai';

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
          <Button colorScheme="teal" type="button" className="button-to-left">
            <AiOutlineDoubleLeft className="arrow-left" onClick={() => paginate(pageNumbers[0])} />
          </Button>
        )}
      {pageNumbers.map((number) => (
        <ListItem key={number} className="page-item">
          <Button colorScheme="teal" isActive={currentPage === number} type="button" onClick={() => paginate(number)} className="page-link">
            {number}
          </Button>
        </ListItem>
      ))}
      {currentPage === pageNumbers[pageNumbers.length - 1]
        ? null
        : (
          <Button colorScheme="teal" type="button" className="button-to-right">
            <AiOutlineDoubleRight className="arrow-right" onClick={() => paginate(pageNumbers[pageNumbers.length - 1])} />
          </Button>
        )}
    </List>
  );
};

export default Pagination;
