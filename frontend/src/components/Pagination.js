/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */
import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  console.log(totalPosts);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li key={number} className="page-item">
          <button type="button" onClick={() => paginate(number)} className="page-link">
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
