import { createAsyncAction } from 'typesafe-actions';
import { RecipeTitleModel, RecipeModel } from '../../services/recipesTypes';

export enum RecipesActions {
  GET_SEARCH_RECIPES_REQUEST = '@goods/GET_SEARCH_RECIPES_REQUEST',
  GET_SEARCH_RECIPES_SUCCESS = '@goods/GET_SEARCH_RECIPES_SUCCESS',
  GET_SEARCH_RECIPES_FAILURE = '@goods/GET_ALL_GOODS_FAILURE',

  GET_RECIPE_REQUEST = '@goods/GET_RECIPE_REQUEST',
  GET_RECIPE_SUCCESS = '@goods/GET_RECIPE_SUCCESS',
  GET_RECIPE_FAILURE = '@goods/GET_RECIPE_FAILURE'
}

export const searchRecipesAsyncAction = createAsyncAction(
  RecipesActions.GET_SEARCH_RECIPES_REQUEST,
  RecipesActions.GET_SEARCH_RECIPES_SUCCESS,
  RecipesActions.GET_SEARCH_RECIPES_FAILURE
)<undefined, { recipesTitles: RecipeTitleModel[] }, { error: Error }>();

export const getRecipeAsyncAction = createAsyncAction(
  RecipesActions.GET_RECIPE_REQUEST,
  RecipesActions.GET_RECIPE_SUCCESS,
  RecipesActions.GET_RECIPE_FAILURE
)<{ id: string }, { recipe: RecipeModel; id: string }, { error: Error; id: string }>();
