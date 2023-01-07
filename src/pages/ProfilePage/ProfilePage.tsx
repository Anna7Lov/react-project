import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../rdx/user/selectors';
import { Title } from '../../components/shared/Title/Title';
import { FavouriteRecipe } from '../../components/profile/FavouriteRecipe/FavouriteRecipe';
import './ProfilePage.scss';

export const ProfilePage = (): JSX.Element => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className='profile'>
      <Title title='My favourite recipes'/>
      <ul className='profile__favourite-recipes'>
        {currentUser?.favouriteRecipes.map((favouriteRecipe) => (
          <FavouriteRecipe favouriteRecipe={favouriteRecipe} key={favouriteRecipe.id}/>
        ))
        }
      </ul>
    </div>
  );
};
