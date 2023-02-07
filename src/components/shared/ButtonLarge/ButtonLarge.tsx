import React from 'react';
import './ButtonLarge.scss';

interface ButtonLargeProps {
  isDisabled?: boolean;
  title: string;
}

export const ButtonLarge = ({
  isDisabled,
  title
}: ButtonLargeProps): JSX.Element => {
  return (
    <button className='button-large'
      type="submit"
      disabled={isDisabled}
      >
      {title}
    </button>
  );
};
