import { GlobalAppState } from '../rootReducer';
import {
  RecipeTitleModel,
  RequestState,
  RecipeModel
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
