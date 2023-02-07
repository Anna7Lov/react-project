import { combineReducers } from 'redux';
import { reducer as recipesReducer, RecipesState } from './recipes/reducer';
import { reducer as userReducer, UserState } from './user/reducer';

export interface GlobalAppState {
  recipes: RecipesState;
  user: UserState;
}

export const rootReducer = combineReducers<GlobalAppState>({
  recipes: recipesReducer,
  user: userReducer
});
