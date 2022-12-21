import React from 'react';
import { Link } from 'react-router-dom';
import { RecipeTitleModel } from '../../../services/recipesTypes';
import './RecipeTitle.scss';

interface RecipeTitleProps {
  recipe: RecipeTitleModel;
}

export const RecipeTitle = ({ recipe }: RecipeTitleProps): JSX.Element => {
  return (
    <div key={recipe.id} className="recipe-main">
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
