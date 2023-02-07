import React from 'react';
import './Subtitle.scss';

interface SubtitleProps {
  subtitle: string;
}

export const Subtitle = ({ subtitle }: SubtitleProps): JSX.Element => {
  return <h3 className="subtitle">{subtitle}</h3>;
};
