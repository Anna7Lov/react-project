import { RecipeTitleModel } from '../services/recipesTypes';

export const isRecipeFavourite = (id: number, favouriteRecipesList: RecipeTitleModel[]): boolean => {
  return favouriteRecipesList.some((item) => item.id === id);
};
