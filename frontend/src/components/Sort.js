/* eslint-disable object-curly-newline */
import React from 'react';
import SortByData from './SortByData';

const Sort = () => (
  <div className="sort-button-container">
    <button className="sortButton" type="submit">All</button>
    <button className="sortButton" type="submit">Done</button>
    <button className="sortButton" type="submit">Undone</button>
    <SortByData />
  </div>
);

export default Sort;
