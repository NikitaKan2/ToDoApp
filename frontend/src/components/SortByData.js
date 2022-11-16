import React from 'react';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';

const SortByDate = ({ sortPosts }) => (
  <div className="conteiner-sort-arrows">
    <span className="text-sort">Sort By Data</span>
    <AiOutlineArrowUp onClick={() => sortPosts('up')} className="arrow-up" />
    <AiOutlineArrowDown onClick={() => sortPosts('down')} className="arrow-down" />
  </div>
);

export default SortByDate;
