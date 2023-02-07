import { GlobalAppState } from '../rootReducer';
import { UserModel } from '../../services/userTypes';

export const selectIsUserAuthenticated = (state: GlobalAppState): boolean =>
  state.user.isUserAuthenticated;

export const selectUsers = (state: GlobalAppState): UserModel[] => state.user.users;

export const selectCurrentUser = (state: GlobalAppState): UserModel | null =>
  state.user.currentUser;
