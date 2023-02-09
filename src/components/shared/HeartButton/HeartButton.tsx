import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavoritesAction, removeFromFavoritesAction } from '../../../rdx/user/actions';
import { selectCurrentUser } from '../../../rdx/user/selectors';
import { RecipeTitleModel } from '../../../services/recipesTypes';
import { isItemInList } from '../../../utils/isItemInList';
import './HeartButton.scss';

interface HeartButtonProps {
  id: number;
  recipe: RecipeTitleModel;
}

export const HeartButton = ({ id, recipe }: HeartButtonProps): JSX.Element => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const onHeartButtonClick = useCallback(() => {
    if (currentUser) {
      if (isItemInList(id, currentUser.favoriteRecipes)) {
        dispatch(removeFromFavoritesAction(id));
      } else {
        dispatch(addToFavoritesAction(recipe));
      }
    }
  }, [dispatch, currentUser?.favoriteRecipes, recipe, id]);

  return (
    <div className='heart-button'>
      {currentUser
        ? <button className='heart-button__button' onClick={onHeartButtonClick}>
            <span
              className={isItemInList(id, currentUser.favoriteRecipes)
                ? 'heart-button__heart heart-added'
                : 'heart-button__heart'}
            ></span >
          </button >
        : ''}
    </div>
  );
};
