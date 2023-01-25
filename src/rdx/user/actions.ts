import { createAction } from 'typesafe-actions';
import { RecipeTitleModel } from '../../services/recipesTypes';
import { RatingItemModel, UserModel } from '../../services/userTypes';

export enum UserActions {
  REGISTER_USER = '@user/REGISTER_USER',
  LOGIN_USER = '@user/LOGIN_USER',
  LOGOUT_USER = '@user/LOGOUT_USER',
  ADD_TO_FAVORITES = '@user/ADD_TO_FAVORITES',
  REMOVE_FROM_FAVORITES = '@user/REMOVE_FROM_FAVORITES',
  CHANGE_THEME = '@user/CHANGE_THEME',
  CHANGE_LANGUAGE = '@user/CHANGE_LANGUAGE',
  EDIT_USER_DATA = '@user/EDIT_USER_DATA',
  EDIT_USER_PASSWORD = '@user/EDIT_USER_PASSWORD',
  ADD_TO_RATING_LIST = '@user/ADD_TO_RATING_LIST',
  REMOVE_FROM_RATING_LIST = '@user/REMOVE_FROM_RATING_LIST'
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

export const addToFavoritesAction = createAction(
  UserActions.ADD_TO_FAVORITES,
  (recipe): RecipeTitleModel => (
    recipe
  )
)();

export const removeFromFavoritesAction = createAction(
  UserActions.REMOVE_FROM_FAVORITES,
  (id): number => (
    id
  )
)();

export const changeThemeAction = createAction(
  UserActions.CHANGE_THEME,
  (theme): string => (
    theme
  )
)();

export const changeLanguageAction = createAction(
  UserActions.CHANGE_LANGUAGE,
  (language): string => (
    language
  )
)();

export const editUserDataAction = createAction(
  UserActions.EDIT_USER_DATA,
  (editedUser): Omit<UserModel, 'id, password, favoriteRecipes, theme'> => (
    editedUser
  )
)();

export const editUserPasswordAction = createAction(
  UserActions.EDIT_USER_PASSWORD,
  (editedUserPassword): Pick<UserModel, 'password'> => (
    editedUserPassword
  )
)();

export const addToRatingListAction = createAction(
  UserActions.ADD_TO_RATING_LIST,
  (ratingItem): RatingItemModel => (
    ratingItem
  )
)();

export const removeFromRatingListAction = createAction(
  UserActions.REMOVE_FROM_RATING_LIST,
  (id): number => (
    id
  )
)();
