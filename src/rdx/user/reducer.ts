import { getType } from 'typesafe-actions';
import { UserModel } from '../../services/userTypes';
import { GlobalAppActions } from '../actions';
import { registerUserAction, logoutUserAction, loginUserAction, addToFavouritesAction, removeFromFavouritesAction } from './actions';

export interface UserState {
  users: UserModel[];
  currentUser: UserModel | null;
  isUserAuthenticated: boolean;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  isUserAuthenticated: false
};

export const reducer = (state = initialState, action: GlobalAppActions): UserState => {
  switch (action.type) {
    case getType(registerUserAction):
      return {
        ...state,
        users: [...state.users, action.payload]
      };

    case getType(loginUserAction):
      return {
        ...state,
        currentUser: action.payload,
        isUserAuthenticated: true
      };

    case getType(logoutUserAction):
      return {
        ...state,
        isUserAuthenticated: false,        
        currentUser: null
      };

    case getType(addToFavouritesAction):
      if (state.currentUser) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            favouriteRecipes: [...state.currentUser.favouriteRecipes, action.payload]
          },
          users: state.users.map((i) => (
            i.email === state.currentUser?.email ? {
              ...state.currentUser,
              favouriteRecipes: [...state.currentUser.favouriteRecipes, action.payload]
            } : i
          )),
        };
      } else {
        return {
          ...state
        };
      }

    case getType(removeFromFavouritesAction):
      if (state.currentUser) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            favouriteRecipes: state.currentUser.favouriteRecipes.filter(
              (item) => item.id !== action.payload
            )
          },
          users: state.users.map((i) => (
            i.email === state.currentUser?.email ? {
              ...state.currentUser,
            favouriteRecipes: state.currentUser.favouriteRecipes.filter(
              (item) => item.id !== action.payload
            )
            } : i
          )), 
        };
      } else {
        return {
          ...state
        };
      }

    default:
      return state;
  }
};
