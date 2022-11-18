import React from 'react';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';

const SortByDate = ({ sortPosts, selected }) => (
  <div className="conteiner-sort-arrows">
    <span className="text-sort">Sort By Data</span>
    <AiOutlineArrowUp onClick={() => sortPosts('up')} className={selected === 'up' ? 'arrow-up-active' : 'arrow-up'} />
    <AiOutlineArrowDown onClick={() => sortPosts('down')} className={selected === 'down' ? 'arrow-down-active' : 'arrow-down'} />
  </div>
);

export default SortByDate;
