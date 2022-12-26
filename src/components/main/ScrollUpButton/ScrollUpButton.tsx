import React, { useState, useEffect, useCallback } from 'react';
import './ScrollUpButton.scss';

export const ScrollUpButton = (): JSX.Element => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
  }, []);

  const onScroll = useCallback(() => {
    if (window.scrollY > 300) {
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
    }
  }, []);

  const moveUp = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div>
      {isButtonVisible
        ? (<button className='scroll-up-button' onClick={moveUp}/>)
        : ''}
    </div>
  );
};
