import { GlobalAppState } from '../rootReducer';
import {
  RecipeTitleModel,
  RequestState,
  RecipeModel,
  SimilarRecipeModel,
  AutocompleteModel
} from '../../services/recipesTypes';

export const selectRecipes = (state: GlobalAppState): RecipeTitleModel[] =>
  state.recipes.recipesTitles;

export const selectAreRecipesLoading = (state: GlobalAppState): boolean =>
  state.recipes.searchRecipesRequestState === RequestState.Waiting;

export const selectAreRecipesFailed = (state: GlobalAppState): Error | null => state.recipes.error;

export const selectRecipe = (
  state: GlobalAppState
): {
  [id: string]: {
    requestState: RequestState;
    info: RecipeModel | null;
    error: Error | null;
  };
} => state.recipes.recipe;

export const selectSimilarRecipes = (state: GlobalAppState): SimilarRecipeModel[] =>
  state.recipes.similarRecipes;

export const selectAreSimilarRecipesLoading = (state: GlobalAppState): boolean =>
  state.recipes.similarRecipesRequestState === RequestState.Waiting;

export const selectAreSimilarRecipesFailed = (state: GlobalAppState): Error | null => state.recipes.similarRecipesError;

export const selectAutocomplete = (state: GlobalAppState): AutocompleteModel[] =>
  state.recipes.autocomplete;

export const selectIsAutocompleteLoading = (state: GlobalAppState): boolean =>
  state.recipes.autocompleteRequestState === RequestState.Waiting;

export const selectIsAutocompleteFailed = (state: GlobalAppState): Error | null => state.recipes.autocompleteError;
