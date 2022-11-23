/* eslint-disable object-curly-newline */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */
import React from 'react';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai';

const Pagination = ({ currentPage, setCurrentPage, postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  const className = totalPosts > 5 ? 'pagination' : 'pagination-none';

  return (
    <ul className={className}>
      <button type="button" className={currentPage === 1 ? 'arrow-none' : 'button-to-left'}>
        <AiOutlineDoubleLeft className="arrow-left" onClick={() => setCurrentPage(pageNumbers[0])} />
      </button>
      {pageNumbers.map((number) => (
        <li key={number} className="page-item">
          <button type="button" onClick={() => paginate(number)} className={currentPage === number ? 'page-link' : }>
            {number}
          </button>
        </li>
      ))}
      <button type="button" className={currentPage === pageNumbers[pageNumbers.length - 1] ? 'arrow-none' : 'button-to-right'}>
        <AiOutlineDoubleRight className="arrow-right" onClick={() => setCurrentPage(pageNumbers[pageNumbers.length - 1])} />
      </button>
    </ul>
  );
};

export default Pagination;
