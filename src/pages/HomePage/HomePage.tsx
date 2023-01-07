import React from 'react';
import { Search } from '../../components/main/Search/Search';
import { RecipeTitleList } from '../../components/main/RecipeTitleList/RecipeTitleList';
import { Partners } from '../../components/shared/Partners/Partners';
import { ScrollUpButton } from '../../components/main/ScrollUpButton/ScrollUpButton';

export const HomePage = (): JSX.Element => {
  return (
    <div>
      <ScrollUpButton />
      <Search />
      <RecipeTitleList />
      <Partners />
    </div>
  );
};
