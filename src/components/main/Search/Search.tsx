import React from 'react';
import './Search.scss';

export const Search = (): JSX.Element => {
  return (
    <div className="search">
      <input placeholder="Search..." type="search" className="search__input" />
      <button className="search__button"></button>
    </div>
  );
};
