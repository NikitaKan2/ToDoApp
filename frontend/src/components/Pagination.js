/* eslint-disable object-curly-newline */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */
import React from 'react';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai';

const Pagination = ({ currentPage, postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  const className = pageNumbers.length >= 2 ? 'pagination' : 'pagination-none';

  return (
    <ul className={className}>
      <button type="button" className={currentPage === 1 ? 'button-none' : 'button-to-left'}>
        <AiOutlineDoubleLeft className="arrow-left" onClick={() => paginate(pageNumbers[0])} />
      </button>
      {pageNumbers.map((number) => (
        <li key={number} className={currentPage === number ? 'page-link-active' : 'page-item'}>
          <button type="button" onClick={() => paginate(number)} className="page-link">
            {number}
          </button>
        </li>
      ))}
      <button type="button" className={currentPage === pageNumbers[pageNumbers.length - 1] ? 'button-none' : 'button-to-right'}>
        <AiOutlineDoubleRight className="arrow-right" onClick={() => paginate(pageNumbers[pageNumbers.length - 1])} />
      </button>
    </ul>
  );
};

export default Pagination;
