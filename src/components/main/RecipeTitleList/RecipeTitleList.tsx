import { slice } from 'lodash';
import { useTranslation } from 'react-i18next';
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
  const [index, setIndex] = useState<number>(16);
  const [isCompleted, setIsCompleted] = useState<boolean>();
  const { t } = useTranslation();

  const recipesToShow = slice(recipes, 0, index);

  const showMore = useCallback(() => {
    setIndex(index + 16);
  }, [index]);

  useEffect(() => {
    if (index >= recipes.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  }, [index, recipes]);

  useEffect(() => {
    setIndex(16);
  }, [recipes]);

  return (
    <div className="recipe-title-list">
      {isLoading
        ? (<Loading />)
        : !isLoading && !error
            ? (<div className="recipe-title-list__results">
            {recipes?.length
              ? <div>
                <div className='recipe-title-list__items'>
                  {(recipesToShow.map((recipe) => (
                    <RecipeTitle recipe={recipe} key={recipe.id} />
                  ))
                  )}
                </div>
                <button
                  type="button"
                  onClick={showMore}
                  disabled={isCompleted}
                  className="recipe-title-list__button"
                >
                  {t('showMore')}
                </button>
              </div>
              : (<div className="recipe-title-list__no-results">
                {t('searchNoResults')}
              </div>
                )}
          </div>
              )
            : (<div className="recipe-title-list__no-results">
            Error: {error?.message}
          </div>
              )}
    </div>
  );
};
