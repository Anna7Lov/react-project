import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectSimilarRecipes,
  selectAreSimilarRecipesLoading,
  selectAreSimilarRecipesFailed
} from '../../../rdx/recipes/selectors';
import { Loading } from '../../shared/Loading/Loading';
import { Subtitle } from '../Subtitle/Subtitle';
import { SimilarRecipe } from '../SimilarRecipe/SimilarRecipe';
import './SimilarRecipesList.scss';

export const SimilarRecipesList = (): JSX.Element => {
  const similarRecipes = useSelector(selectSimilarRecipes);
  const AreSimilarRecipesLoading = useSelector(selectAreSimilarRecipesLoading);
  const similarRecipesError = useSelector(selectAreSimilarRecipesFailed);

  return (
    <div className="similar-recipes-list">
      {AreSimilarRecipesLoading
        ? (<Loading />)
        : !AreSimilarRecipesLoading && !similarRecipesError && similarRecipes.length
            ? (<div>
          <Subtitle subtitle='Similar Recipes:' />
          <ul className="similar-recipes-list__items">
            {similarRecipes.map((similarRecipe) => (
              <SimilarRecipe
                similarRecipe={similarRecipe}
                key={similarRecipe.id}
              />
            ))}
          </ul>
        </div>
              )
            : !similarRecipes.length && !similarRecipesError
                ? ''
                : (
        <div className="similar-recipes-list__error">
          No Similar Recipes. {similarRecipesError?.message}
        </div>
                  )}
    </div>
  );
};
