import { RatingItemModel } from '../services/userTypes';

export const recipeRatingById = (id: number, ratingList: RatingItemModel[]): number | undefined => {
  return ratingList.find((item) => item.id === id)?.rating;
};
