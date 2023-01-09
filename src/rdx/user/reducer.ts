import { getType } from 'typesafe-actions';
import { UserModel } from '../../services/userTypes';
import { GlobalAppActions } from '../actions';
import {
  registerUserAction,
  logoutUserAction,
  loginUserAction,
  addToFavoritesAction,
  removeFromFavoritesAction,
  changeThemeAction,
  editUserDataAction,
  editUserPasswordAction
}
  from './actions';

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

    case getType(addToFavoritesAction):
      if (state.currentUser) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            favoriteRecipes: [...state.currentUser.favoriteRecipes, action.payload]
          },
          users: state.users.map((i) => (
            i.email === state.currentUser?.email
              ? {
                  ...state.currentUser,
                  favoriteRecipes: [...state.currentUser.favoriteRecipes, action.payload]
                }
              : i
          ))
        };
      } else {
        return {
          ...state
        };
      }

    case getType(removeFromFavoritesAction):
      if (state.currentUser) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            favoriteRecipes: state.currentUser.favoriteRecipes.filter(
              (item) => item.id !== action.payload
            )
          },
          users: state.users.map((i) => (
            i.email === state.currentUser?.email
              ? {
                  ...state.currentUser,
                  favoriteRecipes: state.currentUser.favoriteRecipes.filter(
                    (item) => item.id !== action.payload
                  )
                }
              : i
          ))
        };
      } else {
        return {
          ...state
        };
      }

    case getType(changeThemeAction):
      if (state.currentUser) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            theme: action.payload
          },
          users: state.users.map((i) => (
            i.id === state.currentUser?.id
              ? {
                  ...state.currentUser,
                  theme: action.payload
                }
              : i
          ))
        };
      } else {
        return {
          ...state
        };
      }

    case getType(editUserDataAction):
      if (state.currentUser) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            name: action.payload.name,
            lastName: action.payload.lastName,
            phone: action.payload.phone,
            email: action.payload.email
          },
          users: state.users.map((i) => (
            i.id === state.currentUser?.id
              ? {
                  ...state.currentUser,
                  name: action.payload.name,
                  lastName: action.payload.lastName,
                  phone: action.payload.phone,
                  email: action.payload.email
                }
              : i
          ))
        };
      } else {
        return {
          ...state
        };
      }

    case getType(editUserPasswordAction):
      if (state.currentUser) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            password: action.payload.password
          },
          users: state.users.map((i) => (
            i.id === state.currentUser?.id
              ? {
                  ...state.currentUser,
                  password: action.payload.password
                }
              : i
          ))
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