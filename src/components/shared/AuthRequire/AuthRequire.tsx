import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsUserAuthenticated } from '../../../rdx/user/selectors';

interface AuthRequireProps {
  children: React.ReactElement;
}

export const AuthRequire = ({ children }: AuthRequireProps): JSX.Element | null => {
  const navigate = useNavigate();
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated);

  useEffect(() => {
    if (!isUserAuthenticated) {
      navigate('/login');
    }
  }, [isUserAuthenticated]);

  return isUserAuthenticated ? children : null;
};
