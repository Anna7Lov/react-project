import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToRatingListAction, removeFromRatingListAction } from '../../../rdx/user/actions';
import { StarItem } from '../StarItem/StarItem';
import './StarRating.scss';

interface StarRatingProps {
  id: number;
}

export const StarRating = ({ id }: StarRatingProps): JSX.Element => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const onStarClick = useCallback((index: number) => {
    setRating(index + 1);
    dispatch(addToRatingListAction({ id: id, rating: index + 1 }));
  }, [dispatch, rating]);

  const onStarDoubleClick = useCallback(() => {
    setRating(0);
    dispatch(removeFromRatingListAction(id));
  }, []);

  const onHoverEnter = useCallback((index: number) => {
    setHover(index + 1);
  }, []);

  const onHoverLeave = useCallback(() => {
    setHover(rating);
  }, []);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => (
        <StarItem
          key={index}
          index={index}
          id={id}
          hover={hover}
          onStarClick={onStarClick}
          onStarDoubleClick={onStarDoubleClick}
          onHoverEnter={onHoverEnter}
          onHoverLeave={onHoverLeave}
        />
      ))}
    </div>
  );
};
