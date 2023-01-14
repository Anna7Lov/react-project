import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCurrentUser } from '../../../rdx/user/selectors';
import { RecipeTitleModel } from '../../../services/recipesTypes';
import { HeartButton } from '../../shared/HeartButton/HeartButton';
import { StarRating } from '../../shared/StarRating/StarRating';
import './RecipeTitle.scss';

interface RecipeTitleProps {
  recipe: RecipeTitleModel;
}

export const RecipeTitle = ({ recipe }: RecipeTitleProps): JSX.Element => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className="recipe-main">
      {currentUser
        ? <div className='recipe-main__heart-button'>
        <HeartButton id={recipe.id} recipe={{ id: recipe.id, title: recipe.title, image: recipe.image }} />
        </div>
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
      {currentUser
        ? (<StarRating id={recipe.id} />)
        : ''
      }
    </div>
  );
};
