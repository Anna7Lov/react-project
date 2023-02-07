import React from 'react';
import { Link } from 'react-router-dom';
import { SimilarRecipeModel } from '../../../services/recipesTypes';
import './SimilarRecipe.scss';

interface SimilarRecipeProps {
  similarRecipe: SimilarRecipeModel;
}

export const SimilarRecipe = ({ similarRecipe }: SimilarRecipeProps): JSX.Element => {
  return (
    <li key={similarRecipe.id} className="similar-recipe">
      <Link
        to={`/recipes/${similarRecipe.id}/information`}
        className="similar-recipe__link"
      >
        <h4 className="similar-recipe__title">{similarRecipe.title}</h4>
        <span className="similar-recipe__time">
          Preparation time: {similarRecipe.readyInMinutes} minutes
        </span>
      </Link>
    </li>
  );
};
