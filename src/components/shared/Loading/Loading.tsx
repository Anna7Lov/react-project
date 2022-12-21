import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import './Loading.scss';

export const Loading = (): JSX.Element => {
  return (
    <div className="loading">
      <ThreeDots
        height="128"
        width="128"
        color="#0ea310"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
};
