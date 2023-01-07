import { createAction } from 'typesafe-actions';
import { RecipeTitleModel } from '../../services/recipesTypes';
import { UserModel } from '../../services/userTypes';

export enum UserActions {
  REGISTER_USER = '@user/REGISTER_USER',
  LOGIN_USER = '@user/LOGIN_USER',
  LOGOUT_USER = '@user/LOGOUT_USER',
  ADD_TO_FAVOURITES = '@user/ADD_TO_FAVOURITES',
  REMOVE_FROM_FAVOURITES = '@user/REMOVE_FROM_FAVOURITES',
}

export const registerUserAction = createAction(
  UserActions.REGISTER_USER,
  (newUser): UserModel => (
    newUser
  )
)();

export const loginUserAction = createAction(
  UserActions.LOGIN_USER,
  (user): UserModel => (
    user
  )
)();

export const logoutUserAction = createAction(UserActions.LOGOUT_USER)();

export const addToFavouritesAction = createAction(
  UserActions.ADD_TO_FAVOURITES,
  (recipe): RecipeTitleModel => (
    recipe
  )
)();

export const removeFromFavouritesAction = createAction(
  UserActions.REMOVE_FROM_FAVOURITES,
  (id): number => (
    id
  )
)();
