import { getType } from 'typesafe-actions';
import { GlobalAppActions } from '../actions';
import {
  searchRecipesAsyncAction,
  getRecipeAsyncAction
} from './actions';
import { RecipeTitleModel, RecipeModel, RequestState } from '../../services/recipesTypes';

export interface RecipesState {
  recipesTitles: RecipeTitleModel[];
  searchRecipesRequestState: RequestState;
  error: Error | null;
  recipe: { [id: string]: {
    requestState: RequestState;
    info: RecipeModel | null;
    error: Error | null;
  }; };
}

const initialState: RecipesState = {
  recipesTitles: [],
  searchRecipesRequestState: RequestState.Unset,
  error: null,
  recipe: {}
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

    default: {
      return state;
    }
  }
};
