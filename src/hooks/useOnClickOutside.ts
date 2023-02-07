import { MutableRefObject, useCallback, useEffect } from 'react';

export const useOnClickOutside = (
  elementRef: MutableRefObject<HTMLElement | null>,
  handler: () => void,
  isOpened: boolean
): void => {
  const handleMousedown = useCallback((e: MouseEvent) => {
    if (!elementRef.current) return;
    if (!elementRef.current.contains(e.target as Node)) {
      handler();
    }
  }, [elementRef, handler]);

  useEffect(() => {
    if (!isOpened) return;
    document.addEventListener('mousedown', handleMousedown);
    return () => {
      document.removeEventListener('mousedown', handleMousedown);
    };
  }, [isOpened, handleMousedown]);
};
