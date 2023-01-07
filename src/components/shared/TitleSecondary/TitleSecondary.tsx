import React from 'react';
import { useThemeContext } from '../../../hooks/useThemeContext';
import './TitleSecondary.scss';

interface TitleSecondaryProps {
  title: string;
}

export const TitleSecondary = ({ title }: TitleSecondaryProps): JSX.Element => {
  const theme = useThemeContext();
  return (
    <h3
      className={
        theme === 'dark'
          ? 'title-secondary dark-title-secondary'
          : 'title-secondary'
      }
    >
      {title}
    </h3>
  );
};
