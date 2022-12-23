import React from 'react';
import { Search } from '../../components/main/Search/Search';
import { Partners } from '../../components/shared/Partners/Partners';

export const HomePage = (): JSX.Element => {
  return (
    <div>
      <Search />
      <Partners />
    </div>
  );
};
