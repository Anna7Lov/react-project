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
          users: state.users.map((u) => (
            u.id === state.currentUser?.id
              ? {
                  ...u,
                  favoriteRecipes: [...u.favoriteRecipes, action.payload]
                }
              : u
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
          users: state.users.map((u) => (
            u.id === state.currentUser?.id
              ? {
                  ...u,
                  favoriteRecipes: u.favoriteRecipes.filter(
                    (item) => item.id !== action.payload
                  )
                }
              : u
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
          users: state.users.map((u) => (
            u.id === state.currentUser?.id
              ? {
                  ...u,
                  theme: action.payload
                }
              : u
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
          users: state.users.map((u) => (
            u.id === state.currentUser?.id
              ? {
                  ...u,
                  language: action.payload
                }
              : u
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
          users: state.users.map((u) => (
            u.id === state.currentUser?.id
              ? {
                  ...u,
                  name: action.payload.name,
                  lastName: action.payload.lastName,
                  phone: action.payload.phone,
                  email: action.payload.email
                }
              : u
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
          users: state.users.map((u) => (
            u.id === state.currentUser?.id
              ? {
                  ...u,
                  password: action.payload.password
                }
              : u
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
          users: state.users.map((u) => (
            u.id === state.currentUser?.id
              ? {
                  ...u,
                  ratingList: u.ratingList.some((i) => (i.id === action.payload.id))
                    ? u.ratingList.map((item) => item.id === action.payload.id ? action.payload : item)
                    : [...u.ratingList, action.payload]
                }
              : u
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
          users: state.users.map((u) => (
            u.id === state.currentUser?.id
              ? {
                  ...u,
                  ratingList: u.ratingList.filter(
                    (item) => item.id !== action.payload
                  )
                }
              : u
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
