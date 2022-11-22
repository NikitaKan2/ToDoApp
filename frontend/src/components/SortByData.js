import React from 'react';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';

const SortByDate = ({ sortPosts, selectedSort }) => (
  <div className="conteiner-sort-arrows">
    <span className="text-sort">Sort By Data</span>
    <AiOutlineArrowUp onClick={() => sortPosts('asc')} className={selectedSort === 'asc' ? 'arrow-up-active' : 'arrow-up'} />
    <AiOutlineArrowDown onClick={() => sortPosts('desc')} className={selectedSort === 'desc' ? 'arrow-down-active' : 'arrow-down'} />
  </div>
);

export default SortByDate;
