import { slice } from 'lodash';
import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectRecipes,
  selectAreRecipesLoading,
  selectAreRecipesFailed
} from '../../../rdx/recipes/selectors';
import { RecipeTitle } from '../RecipeTitle/RecipeTitle';
import { Loading } from '../../shared/Loading/Loading';
import './RecipeTitleList.scss';

export const RecipeTitleList = (): JSX.Element => {
  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(selectAreRecipesLoading);
  const error = useSelector(selectAreRecipesFailed);
  const [index, setIndex] = useState<number>(12);
  const [isCompleted, setIsCompleted] = useState<boolean>();

  const recipesToShow = slice(recipes, 0, index);

  const showMore = useCallback(() => {
    setIndex(index + 12);
  }, [index]);

  useEffect(() => {
    if (index >= recipes.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  }, [index, recipes]);

  useEffect(() => {
    setIndex(12);
  }, [recipes]);

  return (
    <div className="recipe-title-list">
      {isLoading
        ? (<Loading />)
        : !isLoading && !error
            ? (<div className="recipe-title-list__results">
              {recipes?.length
                ? (recipesToShow.map((recipe) => (
                <RecipeTitle recipe={recipe} key={recipe.id} />
                  ))
                  )
                : (<div className="recipe-title-list__no-results">
                No results. Try changing your search options.
              </div>
                  )}
          </div>
              )
            : (<div className="recipe-title-list__no-results">
            Error: {error?.message}
          </div>
              )}

      <div className="recipe-title-list__show-more">
        {isCompleted
          ? (<button
            type="button"
            disabled
            className="recipe-title-list__disabled-button"
          >
            Show More
          </button>
            )
          : (
            <button
              onClick={showMore}
              type="button"
              className="recipe-title-list__active-button"
            >
              Show More
            </button>
            )}
      </div>
    </div>
  );
};
