import { RecipeTitleModel } from '../services/recipesTypes';
import { RatingItemModel } from '../services/userTypes';

export const isItemInList = (
  id: number,
  list: RecipeTitleModel[] | RatingItemModel[]
): boolean => {
  return list.some((i) => i.id === id);
};
