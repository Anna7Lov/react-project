import React from 'react';
import './ButtonSmall.scss';

interface ButtonSmallProps {
  additionalClass: string;
  type: 'button' | 'submit' | 'reset';
  onButtonSmallClick?: () => void;
  isDisabled?: boolean;
  title: string;
}

export const ButtonSmall = ({
  additionalClass,
  type,
  onButtonSmallClick,
  isDisabled,
  title
}: ButtonSmallProps): JSX.Element => {
  return (
    <button className={`button-small ${additionalClass}`}
      type={type}
      onClick={onButtonSmallClick}
      disabled={isDisabled}
      >
      {title}
    </button>
  );
};
