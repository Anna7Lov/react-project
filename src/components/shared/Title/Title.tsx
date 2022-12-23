import React from 'react';
import { useThemeContext } from '../../../hooks/useThemeContext';
import './Title.scss';

interface TitleProps {
  title: string;
}

export const Title = ({ title }: TitleProps): JSX.Element => {
  const theme = useThemeContext();
  return <h2 className={theme === 'dark' ? 'title dark-title' : 'title'}>{title}</h2>;
};
