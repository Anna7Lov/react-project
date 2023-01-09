import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../rdx/user/selectors';
import { Title } from '../../components/shared/Title/Title';
import { FavoriteRecipe } from '../../components/profile/FavoriteRecipe/FavoriteRecipe';
import { PersonalData } from '../../components/profile/PersonalData/PersonalData';
import { PasswordChange } from '../../components/profile/PasswordChange/PasswordChange';
import './ProfilePage.scss';

export const ProfilePage = (): JSX.Element => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className='profile'>
      <Title title='Personal data' />
      <PersonalData />
      <PasswordChange />
      <Title title='My favorite recipes' />
      {currentUser?.favoriteRecipes.length
        ? <ul className='profile__favorite-recipes'>
          {currentUser?.favoriteRecipes.map((favoriteRecipe) => (
            <FavoriteRecipe favoriteRecipe={favoriteRecipe} key={favoriteRecipe.id} />
          ))
          }
        </ul>
        : <div className='profile__no-recipes'>No favorite recipes. Add them!</div>
      }

    </div>
  );
};
