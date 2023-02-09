import { RatingItemModel } from '../services/userTypes';

export const recipeRatingById = (id: number, ratingList: RatingItemModel[]): number | undefined => {
  return ratingList.find((i) => i.id === id)?.rating;
};
