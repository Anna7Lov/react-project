import { createAsyncAction } from 'typesafe-actions';
import {
  RecipeTitleModel,
  RecipeModel,
  RecipeTasteModel,
  SimilarRecipeModel,
  AutocompleteModel
} from '../../services/recipesTypes';

export enum RecipesActions {
  GET_SEARCH_RECIPES_REQUEST = '@goods/GET_SEARCH_RECIPES_REQUEST',
  GET_SEARCH_RECIPES_SUCCESS = '@goods/GET_SEARCH_RECIPES_SUCCESS',
  GET_SEARCH_RECIPES_FAILURE = '@goods/GET_ALL_GOODS_FAILURE',

  GET_RECIPE_REQUEST = '@goods/GET_RECIPE_REQUEST',
  GET_RECIPE_SUCCESS = '@goods/GET_RECIPE_SUCCESS',
  GET_RECIPE_FAILURE = '@goods/GET_RECIPE_FAILURE',

  GET_RECIPE_TASTE_REQUEST = '@goods/GET_RECIPE_TASTE_REQUEST',
  GET_RECIPE_TASTE_SUCCESS = '@goods/GET_RECIPE_TASTE_SUCCESS',
  GET_RECIPE_TASTE_FAILURE = '@goods/GET_RECIPE_TASTE_FAILURE',

  GET_SIMILAR_RECIPE_REQUEST = '@goods/GET_SIMILAR_RECIPE_REQUEST',
  GET_SIMILAR_RECIPE_SUCCESS = '@goods/GET_SIMILAR_RECIPE_SUCCESS',
  GET_SIMILAR_RECIPE_FAILURE = '@goods/GET_SIMILAR_RECIPE_FAILURE',

  GET_AUTOCOMPLETE_REQUEST = '@goods/GET_AUTOCOMPLETE_REQUEST',
  GET_AUTOCOMPLETE_SUCCESS = '@goods/GET_AUTOCOMPLETE_SUCCESS',
  GET_AUTOCOMPLETE_FAILURE = '@goods/GET_AUTOCOMPLETE_FAILURE',

  GET_FOOD_TRIVIA_REQUEST = '@goods/GET_FOOD_TRIVIA_REQUEST',
  GET_FOOD_TRIVIA_SUCCESS = '@goods/GET_FOOD_TRIVIA_SUCCESS',
  GET_FOOD_TRIVIA_FAILURE = '@goods/GET_FOOD_TRIVIA_FAILURE',
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

export const getRecipeTasteAsyncAction = createAsyncAction(
  RecipesActions.GET_RECIPE_TASTE_REQUEST,
  RecipesActions.GET_RECIPE_TASTE_SUCCESS,
  RecipesActions.GET_RECIPE_TASTE_FAILURE
)<{ id: string }, { recipeTaste: RecipeTasteModel }, { error: Error }>();

export const getSimilarRecipesAsyncAction = createAsyncAction(
  RecipesActions.GET_SIMILAR_RECIPE_REQUEST,
  RecipesActions.GET_SIMILAR_RECIPE_SUCCESS,
  RecipesActions.GET_SIMILAR_RECIPE_FAILURE
)<{ id: string }, { similarRecipes: SimilarRecipeModel[] }, { error: Error }>();

export const getAutocompleteAsyncAction = createAsyncAction(
  RecipesActions.GET_AUTOCOMPLETE_REQUEST,
  RecipesActions.GET_AUTOCOMPLETE_SUCCESS,
  RecipesActions.GET_AUTOCOMPLETE_FAILURE
)<undefined, { autocomplete: AutocompleteModel[] }, { error: Error }>();

export const getFoodTriviaAsyncAction = createAsyncAction(
  RecipesActions.GET_FOOD_TRIVIA_REQUEST,
  RecipesActions.GET_FOOD_TRIVIA_SUCCESS,
  RecipesActions.GET_FOOD_TRIVIA_FAILURE
)<undefined, { foodTrivia: string }, { error: Error }>();
