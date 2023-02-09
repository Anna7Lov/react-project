import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRecipeThunk,
  getRecipeTasteThunk,
  getSimilarRecipesThunk
} from '../../rdx/recipes/thunks';
import { RequestState } from '../../services/recipesTypes';
import { selectRecipe } from '../../rdx/recipes/selectors';
import { selectCurrentUser } from '../../rdx/user/selectors';
import { Loading } from '../../components/shared/Loading/Loading';
import { SimilarRecipesList } from '../../components/recipe/SimilarRecipesList/SimilarRecipesList';
import { HeartButton } from '../../components/shared/HeartButton/HeartButton';
import { StarRating } from '../../components/shared/StarRating/StarRating';
import { RecipeTaste } from '../../components/recipe/RecipeTaste/RecipeTaste';
import { Subtitle } from '../../components/recipe/Subtitle/Subtitle';
import './RecipePage.scss';

export const RecipePage = (): JSX.Element => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector(selectRecipe);
  const currentUser = useSelector(selectCurrentUser);

  const currentRecipe = useMemo(() => {
    if (!id) {
      return null;
    }
    return recipe[id] || null;
  }, [recipe, id]);

  useEffect(() => {
    if (id) {
      dispatch(getRecipeThunk(id));
      dispatch(getRecipeTasteThunk(id));
      dispatch(getSimilarRecipesThunk(id));
    }
  }, [id, dispatch]);

  if (currentRecipe?.requestState === RequestState.Waiting) {
    return <Loading />;
  }

  if (currentRecipe?.requestState === RequestState.Failure) {
    return <div className="no-results">Error: {currentRecipe.error?.message}</div>;
  }

  if (!id || !currentRecipe || !currentRecipe.info) {
    return <div className='no-results'>Sorry, the recipe was not found</div>;
  }

  return (
    <div className="recipe">
      <h1 className="recipe__title">{currentRecipe.info.title}</h1>
      <div className="recipe__top-content">
        <div className='recipe__image-content'>
          {currentUser
            ? <div className='recipe__heart-button'>
              <HeartButton id={+id} recipe={{
                id: +id,
                title: currentRecipe?.info?.title,
                image: currentRecipe?.info?.image
              }} />
            </div>
            : ''
          }
          {currentRecipe.info.image
            ? <img
              src={currentRecipe.info.image}
              alt={currentRecipe.info.title}
              className="recipe__image"
            />
            : <img
              src='https://spoonacular.com/recipeImages/667770-556x370.jpg'
              alt='No image'
              className="recipe__image"
            />
          }
          {currentUser
            ? (<StarRating id={+id} />)
            : ''
          }
        </div>

        <div className="recipe__features">
          <span className="recipe__info">
            Servings: {currentRecipe.info.servings}
          </span>
          <span className="recipe__info">
            Preparation time: {currentRecipe.info.readyInMinutes} minutes
          </span>
          <span className="recipe__info">
            Health score: {currentRecipe.info.healthScore}/100
          </span>

          <div className="recipe__data">
            <h4 className="recipe__subheading">Cuisine:&nbsp;</h4>
            {currentRecipe.info.cuisines?.length
              ? (currentRecipe.info.cuisines?.map((cuisine) => (
                <span key={cuisine} className="recipe__item">
                  {cuisine}
                </span>
                )))
              : (<span>N/A</span>)}
          </div>

          <div className="recipe__data">
            <h4 className="recipe__subheading">Diets:&nbsp;</h4>
            {currentRecipe.info.diets?.length
              ? (currentRecipe.info.diets?.map((diet) => (
                <span key={diet} className="recipe__item">
                  {diet}
                </span>
                )))
              : (<span>N/A</span>)}
          </div>
        </div>
      </div>

      <RecipeTaste />

      <div className="recipe__content">
        <Subtitle subtitle='Ingredients:' />
        <ul className="recipe__ingredients">
          {currentRecipe.info.extendedIngredients?.map((ingredient, index) => (
            <li key={`${ingredient.name}${index}`} className="recipe__ingredient">
              {ingredient.original}
            </li>
          ))}
        </ul>
      </div>

      {currentRecipe.info.analyzedInstructions?.length
        ? (<div className="recipe__content">
          <Subtitle subtitle='Instructions:' />
          <ol className="recipe__instructions">
            {currentRecipe.info.analyzedInstructions[0]?.steps.map(
              (instruction) => (
                <li key={instruction.number} className="recipe__instruction">
                  {instruction.step}
                </li>
              )
            )}
          </ol>
        </div>)
        : ('')}

      <SimilarRecipesList />
    </div>
  );
};
