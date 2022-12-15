import React from 'react';
import { Link } from 'react-router-dom';

import './Logo.scss';

export const Logo = (): JSX.Element => {
  return <Link to="/" className="logo"></Link>;
};
