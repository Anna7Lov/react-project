import React from 'react';
import { ScrollUpButton } from '../../components/main/ScrollUpButton/ScrollUpButton';
import { Search } from '../../components/main/Search/Search';
import { RecipeTitleList } from '../../components/main/RecipeTitleList/RecipeTitleList';
import { Partners } from '../../components/shared/Partners/Partners';

export const HomePage = (): JSX.Element => {
  return (
    <div className='home'>
      <ScrollUpButton />
      <Search />
      <RecipeTitleList />
      <Partners />
    </div>
  );
};
