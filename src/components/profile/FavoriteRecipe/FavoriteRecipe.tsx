import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromFavoritesAction } from '../../../rdx/user/actions';
import { RecipeTitleModel } from '../../../services/recipesTypes';
import { ButtonSmall } from '../../shared/ButtonSmall/ButtonSmall';
import './FavoriteRecipe.scss';

interface FavoriteRecipeProps {
  favoriteRecipe: RecipeTitleModel;
}

export const FavoriteRecipe = ({ favoriteRecipe }: FavoriteRecipeProps): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onDeleteClick = useCallback(() => {
    dispatch(removeFromFavoritesAction(favoriteRecipe.id));
  }, [dispatch, favoriteRecipe.id]);

  return (
    <li className="favorite-recipe">
      <Link
        to={`/recipes/${favoriteRecipe.id}/information`}
        className="favorite-recipe__link"
      >
        <img
          className="favorite-recipe__image"
          src={`${favoriteRecipe.image}`}
          alt={favoriteRecipe.title}
        />
        <h4 className="favorite-recipe__title">{favoriteRecipe.title}</h4>
      </Link>
      <ButtonSmall
        type='button'
        onButtonSmallClick={onDeleteClick}
        title={t('deleteFavoriteRecipeButton')}
        additionalClass='button-delete'
      />
    </li>
  );
};
