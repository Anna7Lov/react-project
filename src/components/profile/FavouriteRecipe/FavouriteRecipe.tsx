import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromFavouritesAction } from '../../../rdx/user/actions';
import { RecipeTitleModel } from '../../../services/recipesTypes';
import './FavouriteRecipe.scss';

interface FavouriteRecipeProps {
  favouriteRecipe: RecipeTitleModel;
}

export const FavouriteRecipe = ({ favouriteRecipe }: FavouriteRecipeProps): JSX.Element => {
  const dispatch = useDispatch();

  const onDeleteClick = useCallback(() => {
    dispatch(removeFromFavouritesAction(favouriteRecipe.id));
  }, []);

  return (
    <li className="favourite-recipe">
      <Link
        to={`/recipes/${favouriteRecipe.id}/information`}
        className="favourite-recipe__link"
      >
        <img
          className="favourite-recipe__image"
          src={`${favouriteRecipe.image}`}
          alt={favouriteRecipe.title}
        />
        <h4 className="favourite-recipe__title">{favouriteRecipe.title}</h4>
      </Link>
      <button className='favourite-recipe__button' onClick={onDeleteClick}>Delete</button>
    </li>
  );
};
