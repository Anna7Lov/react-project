import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return (
    <div className='profile'>
      <Title title={t('personalDataTitle')} />
      <PersonalData />
      <PasswordChange />
      <Title title={t('favoritRecipesTitle')} />
      {currentUser?.favoriteRecipes.length
        ? <ul className='profile__favorite-recipes'>
          {currentUser?.favoriteRecipes.map((favoriteRecipe) => (
            <FavoriteRecipe favoriteRecipe={favoriteRecipe} key={favoriteRecipe.id} />
          ))
          }
        </ul>
        : <div className='profile__no-recipes'>{t('noFavoriteRecipes')}</div>
      }

    </div>
  );
};
