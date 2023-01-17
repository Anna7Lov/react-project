import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromFavoritesAction } from '../../../rdx/user/actions';
import { RecipeTitleModel } from '../../../services/recipesTypes';
import { ButtonSmall } from '../../shared/ButtonSmall/ButtonSmall';
import { selectCurrentUser } from '../../../rdx/user/selectors';
import { StarRating } from '../../shared/StarRating/StarRating';
import './FavoriteRecipe.scss';

interface FavoriteRecipeProps {
  favoriteRecipe: RecipeTitleModel;
}

export const FavoriteRecipe = ({ favoriteRecipe }: FavoriteRecipeProps): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentUser = useSelector(selectCurrentUser);

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
        <h4 className="favorite-recipe__title">
          {favoriteRecipe.title.length < 75
            ? favoriteRecipe.title
            : `${favoriteRecipe.title.substring(0, 72)}...`}

        </h4>
      </Link>
      <div className='favorite-recipe__rating'>
        {currentUser
          ? (<StarRating id={favoriteRecipe.id} />
            )
          : ''
        }
      </div>
      <ButtonSmall
        type='button'
        onButtonSmallClick={onDeleteClick}
        title={t('deleteFavoriteRecipeButton')}
        additionalClass='button-delete'
      />
    </li>
  );
};
