import React, { useCallback } from 'react';
import './Logo.scss';

export const Logo = (): JSX.Element => {
  const refreshPage = useCallback(() => {
    window.location.href = '/';
  }, []);

  return <a className="logo" onClick={refreshPage}></a>;
};
