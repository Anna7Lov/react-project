import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../rdx/user/selectors';
import { recipeRatingById } from '../../../utils/recipeRatingById';
import './StarItem.scss';

interface StarItemProps {
  index: number;
  id: number;
  hover: number;
  onStarClick: (index: number) => void;
  onStarDoubleClick: () => void;
  onHoverEnter: (index: number) => void;
  onHoverLeave: () => void;
}

export const StarItem = ({
  index,
  hover,
  onStarClick,
  onStarDoubleClick,
  onHoverLeave,
  onHoverEnter,
  id
}: StarItemProps): JSX.Element => {
  const currentUser = useSelector(selectCurrentUser);

  const onButtonClick = useCallback(() => {
    onStarClick(index);
  }, [onStarClick, index]);

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
          onClick={onButtonClick}
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
