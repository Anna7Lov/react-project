import React from 'react';
import { useThemeContext } from '../../../hooks/useThemeContext';
import './Text.scss';

interface TextProps {
  text: string;
}

export const Text = ({ text }: TextProps): JSX.Element => {
  const theme = useThemeContext();
  return <p className={theme === 'dark' ? 'text dark-text' : 'text'}>{text}</p>;
};
