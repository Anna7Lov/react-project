import { getType } from 'typesafe-actions';
import { UserModel } from '../../services/userTypes';
import { GlobalAppActions } from '../actions';
import {
  registerUserAction,
  loginUserAction,
  logoutUserAction,
  addToFavoritesAction,
  removeFromFavoritesAction,
  changeThemeAction,
  changeLanguageAction,
  editUserDataAction,
  editUserPasswordAction,
  addToRatingListAction,
  removeFromRatingListAction
}
  from './actions';

export interface UserState {
  users: UserModel[];
  currentUser: UserModel | null;
  isUserAuthenticated: boolean;
  authError: string | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  isUserAuthenticated: false,
  authError: null
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

    case getType(changeLanguageAction):
      if (state.currentUser) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            language: action.payload
          },
          users: state.users.map((i) => (
            i.id === state.currentUser?.id
              ? {
                  ...state.currentUser,
                  language: action.payload
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

    case getType(addToRatingListAction):
      if (state.currentUser) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            ratingList: state.currentUser.ratingList.some((i) => (i.id === action.payload.id))
              ? state.currentUser.ratingList.map((item) => item.id === action.payload.id ? action.payload : item)
              : [...state.currentUser.ratingList, action.payload]
          },
          users: state.users.map((i) => (
            i.email === state.currentUser?.email
              ? {
                  ...state.currentUser,
                  ratingList: state.currentUser.ratingList.some((i) => (i.id === action.payload.id))
                    ? state.currentUser.ratingList.map((item) => item.id === action.payload.id ? action.payload : item)
                    : [...state.currentUser.ratingList, action.payload]
                }
              : i
          ))
        };
      } else {
        return {
          ...state
        };
      }

    case getType(removeFromRatingListAction):
      if (state.currentUser) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            ratingList: state.currentUser.ratingList.filter(
              (item) => item.id !== action.payload
            )
          },
          users: state.users.map((i) => (
            i.email === state.currentUser?.email
              ? {
                  ...state.currentUser,
                  ratingList: state.currentUser.ratingList.filter(
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

    default:
      return state;
  }
};
