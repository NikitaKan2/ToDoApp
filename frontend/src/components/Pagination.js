/* eslint-disable object-curly-newline */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */
import React, { useMemo } from 'react';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = useMemo(() => {
    const numbresForPage = [];

    for (let i = 0; i < totalPages; i += 1) {
      numbresForPage.push(i + 1);
    }
    return numbresForPage;
  }, [totalPages]);

  return (
    <ul className="pagination">
      <button type="button" className={currentPage === 1 ? 'arrow-none' : 'button-to-left'}>
        <AiOutlineDoubleLeft className="arrow-left" onClick={() => paginate(pageNumbers[0])} />
      </button>
      {pageNumbers.map((number) => (
        <li key={number} className={currentPage === number ? 'page-item-active' : 'page-item'}>
          <button type="button" onClick={() => paginate(number)} className="page-link">
            {number}
          </button>
        </li>
      ))}
      <button type="button" className={currentPage === pageNumbers[pageNumbers.length - 1] ? 'arrow-none' : 'button-to-right'}>
        <AiOutlineDoubleRight className="arrow-right" onClick={() => paginate(pageNumbers[pageNumbers.length - 1])} />
      </button>
    </ul>
  );
};

export default Pagination;
