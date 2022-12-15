import React from 'react';
import './Text.scss';

interface TextProps {
  text: string;
}

export const Text = ({ text }: TextProps): JSX.Element => {
  return <p className="text">{text}</p>;
};
