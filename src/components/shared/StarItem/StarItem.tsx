import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToRatingListAction, removeFromRatingListAction } from '../../../rdx/user/actions';
import { selectCurrentUser } from '../../../rdx/user/selectors';
import { recipeRatingById } from '../../../utils/recipeRatingById';
import './StarItem.scss';

interface StarItemProps {
  index: number;
  id: number;
  hover: number;
  onHoverEnter: (index: number) => void;
  onHoverLeave: () => void;
}

export const StarItem = ({
  index,
  id,
  hover,
  onHoverEnter,
  onHoverLeave
}: StarItemProps): JSX.Element => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const onStarClick = useCallback(() => {
    dispatch(addToRatingListAction({ id, rating: index + 1 }));
  }, [dispatch, id, index]);

  const onStarDoubleClick = useCallback(() => {
    dispatch(removeFromRatingListAction(id));
  }, [dispatch, id]);

  const onHover = useCallback(() => {
    onHoverEnter(index);
  }, [onHoverEnter, index]);

  return (
    <div className='star-item'>
      {currentUser
        ? <button
          type="button"
          className={
            index + 1 <=
              (recipeRatingById(id, currentUser.ratingList) ?? 0) &&
              !hover
              ? 'star-item__button filled'
              : index + 1 <= hover ||
                (index + 1 <= hover &&
                  hover <
                  (recipeRatingById(id, currentUser.ratingList) ?? 0))
                ? 'star-item__button hover'
                : 'star-item__button'
          }
          onClick={onStarClick}
          onDoubleClick={onStarDoubleClick}
          onMouseEnter={onHover}
          onMouseLeave={onHoverLeave}
        >
          &#9733;
        </button>
        : ''}
    </div>
  );
};
