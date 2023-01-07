import React from 'react';
import { RecipeTitleModel } from '../../../services/recipesTypes';
import { isRecipeFavourite } from '../../../utils/isRecipeFavourite';
import './Heart.scss';

interface HeartProps {
  id: number;
  list: RecipeTitleModel[];
}

export const Heart = ({ id, list }: HeartProps): JSX.Element => {
  return (
    <span
      className={isRecipeFavourite(id, list) ? 'heart heart-added' : 'heart'}
    ></span>
  );
};
