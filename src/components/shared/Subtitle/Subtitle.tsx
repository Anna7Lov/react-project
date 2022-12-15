import React from 'react';
import './Subtitle.scss';

interface SubtitleProps {
  title: string;
}

export const Subtitle = ({ title }: SubtitleProps): JSX.Element => {
  return <h3 className="subtitle">{title}</h3>;
};
