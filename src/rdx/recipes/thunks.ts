import {
  searchRecipesAsyncAction,
  getRecipeAsyncAction,
  getSimilarRecipesAsyncAction,
  getAutocompleteAsyncAction
} from './actions';

import {
  searchRecipes,
  getRecipe,
  getSimilarRecipes,
  getAutocomplete
} from '../../services/recipesApi';

import { AppDispatch } from '../index';
import { ThunkAction } from 'redux-thunk';
import { GlobalAppState } from '../rootReducer';
import { GlobalAppActions } from '../actions';

export type ThunkAppType = ThunkAction<Promise<void>, GlobalAppState, undefined, GlobalAppActions>;

export const searchRecipesThunk = (q: string, cuisine: string, diet: string, mealType: string, excludeOnion: string, sort: string, sortDirection: string): ThunkAppType => async (dispatch: AppDispatch) => {
  dispatch(searchRecipesAsyncAction.request());
  try {
    const response = await searchRecipes(q, cuisine, diet, mealType, excludeOnion, sort, sortDirection);
    if (!response.success || !response.response) {
      throw (Error('Something went wrong'));
    }
    dispatch(searchRecipesAsyncAction.success({ recipesTitles: response.response.results }));
  } catch (error) {
    dispatch(searchRecipesAsyncAction.failure({ error: new Error('Something went wrong') }));
  }
};

export const getRecipeThunk = (id: string): ThunkAppType => async (dispatch: AppDispatch) => {
  dispatch(getRecipeAsyncAction.request({ id }));
  try {
    const response = await getRecipe(id);
    if (!response.success || !response.response) {
      throw (Error('Something went wrong'));
    }
    dispatch(getRecipeAsyncAction.success({ recipe: response.response, id }));
  } catch (error) {
    dispatch(getRecipeAsyncAction.failure({ error: new Error('Something went wrong'), id }));
  }
};

export const getSimilarRecipesThunk = (id: string): ThunkAppType => async (dispatch: AppDispatch) => {
  dispatch(getSimilarRecipesAsyncAction.request({ id }));
  try {
    const response = await getSimilarRecipes(id);
    if (!response.success || !response.response) {
      throw (Error('Something went wrong'));
    }
    dispatch(getSimilarRecipesAsyncAction.success({ similarRecipes: response.response }));
  } catch (error) {
    dispatch(getSimilarRecipesAsyncAction.failure({ error: new Error('Something went wrong') }));
  }
};

export const getAutocompleteThunk = (q: string): ThunkAppType => async (dispatch: AppDispatch) => {
  dispatch(getAutocompleteAsyncAction.request());
  try {
    const response = await getAutocomplete(q);
    if (!response.success || !response.response) {
      throw (Error('Something went wrong'));
    }
    dispatch(getAutocompleteAsyncAction.success({ autocomplete: response.response }));
  } catch (error) {
    dispatch(getAutocompleteAsyncAction.failure({ error: new Error('Something went wrong') }));
  }
};
