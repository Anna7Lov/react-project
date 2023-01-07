import { ActionType } from 'typesafe-actions';
import * as recipesActions from './recipes/actions';
import * as userActions from './user/actions';

const allActions = {
    recipesActions,
    userActions,
};

export type GlobalAppActions = ActionType<typeof allActions>
