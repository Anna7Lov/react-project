import React from 'react';
import { RecipeTitleModel } from '../../../services/recipesTypes';
import { isRecipeFavorite } from '../../../utils/isRecipeFavorite';
import './Heart.scss';

interface HeartProps {
  id: number;
  list: RecipeTitleModel[];
}

export const Heart = ({ id, list }: HeartProps): JSX.Element => {
  return (
    <span
      className={isRecipeFavorite(id, list) ? 'heart heart-added' : 'heart'}
    ></span>
  );
};
