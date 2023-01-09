import { RecipeTitleModel } from '../services/recipesTypes';

export const isRecipeFavorite = (id: number, favoriteRecipesList: RecipeTitleModel[]): boolean => {
  return favoriteRecipesList.some((item) => item.id === id);
};
