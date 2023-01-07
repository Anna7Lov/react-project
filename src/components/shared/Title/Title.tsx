import React from 'react';
import './Title.scss';

interface TitleProps {
  title: string;
}

export const Title = ({ title }: TitleProps): JSX.Element => {
  return <h2 className="title">{title}</h2>;
};
