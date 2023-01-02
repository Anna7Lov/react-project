import React, { useState, useEffect, useCallback } from 'react';
import './ScrollUpButton.scss';

export const ScrollUpButton = (): JSX.Element => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const onScroll = useCallback(() => {
    if (window.scrollY > 300) {
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

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
