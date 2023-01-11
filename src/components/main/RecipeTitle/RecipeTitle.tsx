import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToFavoritesAction, removeFromFavoritesAction } from '../../../rdx/user/actions';
import { selectCurrentUser } from '../../../rdx/user/selectors';
import { RecipeTitleModel } from '../../../services/recipesTypes';
import { isRecipeFavorite } from '../../../utils/isRecipeFavorite';
import { Heart } from '../../shared/Heart/Heart';
import './RecipeTitle.scss';

interface RecipeTitleProps {
  recipe: RecipeTitleModel;
}

export const RecipeTitle = ({ recipe }: RecipeTitleProps): JSX.Element => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const onHeartButtonClick = useCallback(() => {
    if (currentUser) {
      if (isRecipeFavorite(recipe.id, currentUser.favoriteRecipes)) {
        dispatch(removeFromFavoritesAction(recipe.id));
      } else {
        dispatch(addToFavoritesAction(recipe));
      }
    }
  }, [dispatch, currentUser, recipe]);

  return (
    <div className="recipe-main">
      {currentUser
        ? (<button className='recipe-main__button' onClick={onHeartButtonClick}>
          <Heart id={recipe.id} list={currentUser.favoriteRecipes} />
        </button>)
        : ''
      }
      <Link to={`/recipes/${recipe.id}/information`} className="recipe-main__link">
        <h4 className="recipe-main__title">{recipe.title}</h4>
        <img
          className="recipe-main__image"
          src={`${recipe.image}`}
          alt={recipe.title}
        />
      </Link>
    </div>
  );
};
