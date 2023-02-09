import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFoodTrivia,
  selectIsFoodTriviaFailed,
  selectIsFoodTriviaLoading
} from '../../rdx/recipes/selectors';
import { selectCurrentUser } from '../../rdx/user/selectors';
import { getFoodTriviaThunk } from '../../rdx/recipes/thunks';
import { Title } from '../../components/shared/Title/Title';
import { FavoriteRecipe } from '../../components/profile/FavoriteRecipe/FavoriteRecipe';
import { PersonalData } from '../../components/profile/PersonalData/PersonalData';
import { PasswordChange } from '../../components/profile/PasswordChange/PasswordChange';
import { Loading } from '../../components/shared/Loading/Loading';
import './ProfilePage.scss';

export const ProfilePage = (): JSX.Element => {
  const dispatch = useDispatch();
  const foodTrivia = useSelector(selectFoodTrivia);
  const isFoodTriviaLoading = useSelector(selectIsFoodTriviaLoading);
  const foodTriviaError = useSelector(selectIsFoodTriviaFailed);
  const currentUser = useSelector(selectCurrentUser);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getFoodTriviaThunk());
  }, []);

  return (
    <div className='profile'>
      <Title title={t('personalDataTitle')} />
      <PersonalData />
      <PasswordChange />

      <Title title={t('foodTriviaTitle')} />
      {isFoodTriviaLoading
        ? (<Loading />)
        : !isFoodTriviaLoading && !foodTriviaError
            ? (<div className='profile__food-trivia'>{foodTrivia}</div>)
            : (<div className="profile__food-trivia-error">
            Error: {foodTriviaError?.message}
          </div>
              )}

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
