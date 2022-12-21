import { ActionType } from 'typesafe-actions';
import * as recipesActions from './recipes/actions';

const allActions = {
    recipesActions,
};

export type GlobalAppActions = ActionType<typeof allActions>
