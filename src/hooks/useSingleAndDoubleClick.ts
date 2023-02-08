import { useState, useEffect, MouseEventHandler } from 'react';

export const useSingleAndDoubleClick = (
  handleSingleClick: () => void,
  handleDoubleClick: () => void,
  delay = 220): MouseEventHandler<HTMLButtonElement> => {
  const [click, setClick] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (click === 1) handleSingleClick();
      setClick(0);
    }, delay);

    if (click === 2) handleDoubleClick();

    return () => clearTimeout(timer);
  }, [click, handleSingleClick, handleDoubleClick, delay]);

  return () => setClick(prev => prev + 1);
};
