import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToFavouritesAction, removeFromFavouritesAction } from '../../../rdx/user/actions';
import { selectCurrentUser } from '../../../rdx/user/selectors';
import { RecipeTitleModel } from '../../../services/recipesTypes';
import { isRecipeFavourite } from '../../../utils/isRecipeFavourite';
import { Heart } from '../../shared/Heart/Heart';
import './RecipeTitle.scss';

interface RecipeTitleProps {
  recipe: RecipeTitleModel;
}

export const RecipeTitle = ({ recipe }: RecipeTitleProps): JSX.Element => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const onHeartClick = useCallback(() => {
    if (currentUser) {
      if (isRecipeFavourite(recipe.id, currentUser.favouriteRecipes)) {
        dispatch(removeFromFavouritesAction(recipe.id));
      } else {
        dispatch(addToFavouritesAction(recipe));
      }
    }
  }, [dispatch, currentUser, recipe]);

  return (
    <div className="recipe-main">
      {currentUser
        ? (<button className='recipe-main__button' onClick={onHeartClick}>
          <Heart id={recipe.id} list={currentUser.favouriteRecipes} />
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
