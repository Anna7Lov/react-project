import React, { useCallback, useState } from 'react';
import { StarItem } from '../StarItem/StarItem';
import './StarRating.scss';

interface StarRatingProps {
  id: number;
}

export const StarRating = ({ id }: StarRatingProps): JSX.Element => {
  const [hover, setHover] = useState<number>(0);

  const onHoverEnter = useCallback((index: number) => {
    setHover(index + 1);
  }, []);

  const onHoverLeave = useCallback(() => {
    setHover(0);
  }, []);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => (
        <StarItem
          key={index}
          index={index}
          id={id}
          hover={hover}
          onHoverEnter={onHoverEnter}
          onHoverLeave={onHoverLeave}
        />
      ))}
    </div>
  );
};
