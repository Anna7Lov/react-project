import { getType } from 'typesafe-actions';
import { GlobalAppActions } from '../actions';
import {
  searchRecipesAsyncAction,
  getRecipeAsyncAction,
  getRecipeTasteAsyncAction,
  getSimilarRecipesAsyncAction,
  getAutocompleteAsyncAction,
  getFoodTriviaAsyncAction
} from './actions';
import {
  RecipeTitleModel,
  RecipeModel,
  RequestState,
  RecipeTasteModel,
  SimilarRecipeModel,
  AutocompleteModel
} from '../../services/recipesTypes';

export interface RecipesState {
  recipesTitles: RecipeTitleModel[];
  searchRecipesRequestState: RequestState;
  error: Error | null;
  recipe: { [id: string]: {
    requestState: RequestState;
    info: RecipeModel | null;
    error: Error | null;
  }; };
  recipeTaste: RecipeTasteModel;
  recipeTasteRequestState: RequestState;
  recipeTasteError: Error | null;
  similarRecipes: SimilarRecipeModel[];
  similarRecipesRequestState: RequestState;
  similarRecipesError: Error | null;
  autocomplete: AutocompleteModel[];
  autocompleteRequestState: RequestState;
  autocompleteError: Error | null;
  foodTrivia: string;
  foodTriviaRequestState: RequestState;
  foodTriviaError: Error | null;
}

const initialState: RecipesState = {
  recipesTitles: [],
  searchRecipesRequestState: RequestState.Unset,
  error: null,
  recipe: {},
  recipeTaste: {},
  recipeTasteRequestState: RequestState.Unset,
  recipeTasteError: null,
  similarRecipes: [],
  similarRecipesRequestState: RequestState.Unset,
  similarRecipesError: null,
  autocomplete: [],
  autocompleteRequestState: RequestState.Unset,
  autocompleteError: null,
  foodTrivia: '',
  foodTriviaRequestState: RequestState.Unset,
  foodTriviaError: null
};

export const reducer = (state = initialState, action: GlobalAppActions): RecipesState => {
  switch (action.type) {
    case getType(searchRecipesAsyncAction.request): {
      return {
        ...state,
        searchRecipesRequestState: RequestState.Waiting,
        error: null
      };
    }

    case getType(searchRecipesAsyncAction.success): {
      return {
        ...state,
        recipesTitles: action.payload.recipesTitles,
        searchRecipesRequestState: RequestState.Success,
        error: null
      };
    }

    case getType(searchRecipesAsyncAction.failure): {
      return {
        ...state,
        searchRecipesRequestState: RequestState.Failure,
        error: action.payload.error
      };
    }

    case getType(getRecipeAsyncAction.request): {
      console.log(state.recipe);
      return {
        ...state,
        recipe: {
          ...state.recipe,
          [action.payload.id]: {
            info: null,
            error: null,
            requestState: RequestState.Waiting
          }
        }
      };
    }

    case getType(getRecipeAsyncAction.success): {
      return {
        ...state,
        recipe: {
          ...state.recipe,
          [action.payload.id]: {
            info: action.payload.recipe,
            error: null,
            requestState: RequestState.Success
          }
        }
      };
    }

    case getType(getRecipeAsyncAction.failure): {
      return {
        ...state,
        recipe: {
          ...state.recipe,
          [action.payload.id]: {
            info: null,
            error: action.payload.error,
            requestState: RequestState.Failure
          }
        }
      };
    }

    case getType(getRecipeTasteAsyncAction.request): {
      return {
        ...state,
        recipeTasteRequestState: RequestState.Waiting,
        recipeTasteError: null
      };
    }

    case getType(getRecipeTasteAsyncAction.success): {
      return {
        ...state,
        recipeTaste: action.payload.recipeTaste,
        recipeTasteRequestState: RequestState.Success,
        recipeTasteError: null
      };
    }

    case getType(getRecipeTasteAsyncAction.failure): {
      return {
        ...state,
        recipeTasteRequestState: RequestState.Failure,
        recipeTasteError: action.payload.error
      };
    }

    case getType(getSimilarRecipesAsyncAction.request): {
      return {
        ...state,
        similarRecipesRequestState: RequestState.Waiting,
        similarRecipesError: null
      };
    }

    case getType(getSimilarRecipesAsyncAction.success): {
      return {
        ...state,
        similarRecipes: action.payload.similarRecipes,
        similarRecipesRequestState: RequestState.Success,
        similarRecipesError: null
      };
    }

    case getType(getSimilarRecipesAsyncAction.failure): {
      return {
        ...state,
        similarRecipesRequestState: RequestState.Failure,
        similarRecipesError: action.payload.error
      };
    }

    case getType(getAutocompleteAsyncAction.request): {
      return {
        ...state,
        autocompleteRequestState: RequestState.Waiting,
        autocompleteError: null
      };
    }

    case getType(getAutocompleteAsyncAction.success): {
      return {
        ...state,
        autocomplete: action.payload.autocomplete,
        autocompleteRequestState: RequestState.Success,
        autocompleteError: null
      };
    }

    case getType(getAutocompleteAsyncAction.failure): {
      return {
        ...state,
        autocompleteRequestState: RequestState.Failure,
        autocompleteError: action.payload.error
      };
    }

    case getType(getFoodTriviaAsyncAction.request): {
      return {
        ...state,
        foodTriviaRequestState: RequestState.Waiting,
        foodTriviaError: null
      };
    }

    case getType(getFoodTriviaAsyncAction.success): {
      return {
        ...state,
        foodTrivia: action.payload.foodTrivia,
        foodTriviaRequestState: RequestState.Success,
        foodTriviaError: null
      };
    }

    case getType(getFoodTriviaAsyncAction.failure): {
      return {
        ...state,
        foodTriviaRequestState: RequestState.Failure,
        foodTriviaError: action.payload.error
      };
    }

    default: {
      return state;
    }
  }
};
