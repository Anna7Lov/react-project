import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = (): JSX.Element => {
  return (
    <div>
      This page does not exist. Go <Link to='/'>home</Link>
    </div>
  );
};
