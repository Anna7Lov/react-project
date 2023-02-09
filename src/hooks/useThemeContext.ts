import { useContext } from 'react';
import { ThemeContext } from '../App';

export const useThemeContext = (): string => {
  const theme = useContext(ThemeContext);
  return theme;
};
