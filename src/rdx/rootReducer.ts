import { combineReducers } from 'redux';
import { reducer as recipesReducer, RecipesState } from './recipes/reducer';

export interface GlobalAppState {
  recipes: RecipesState;
}

export const rootReducer = combineReducers<GlobalAppState>({
  recipes: recipesReducer
});
