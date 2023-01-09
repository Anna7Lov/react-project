import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthorizationPage } from './pages/AuthorizationPage/AuthorizationPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { HomePage } from './pages/HomePage/HomePage';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { RecipePage } from './pages/RecipePage/RecipePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Layout } from './components/shared/Layout/Layout';
import { AuthRequire } from './components/shared/AuthRequire/AuthRequire';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { useDispatch, useSelector } from 'react-redux';
import { changeThemeAction } from './rdx/user/actions';
import { selectCurrentUser } from './rdx/user/selectors';
import './App.scss';

export const ThemeContext = createContext('light');

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [theme, setTheme] = useState('light');

  const onThemeChanged = useCallback(
    (checked: boolean) => {
      if (checked) {
        setTheme('dark');
        dispatch(changeThemeAction('dark'));
      } else {
        setTheme('light');
        dispatch(changeThemeAction('light'));
      }
    }, [dispatch]);

  useEffect(
    () => {
      if (currentUser) {
        setTheme(currentUser.theme);
      }
    }, [currentUser]);

  return (
    <ThemeContext.Provider value={theme}>
      <div className={theme} >
        <Routes>
          <Route path='login' element={<AuthorizationPage />} />
          <Route path='signup' element={<RegistrationPage />} />
          <Route path='/' element={<AuthRequire><Layout onThemeChanged={onThemeChanged} theme={theme} /></AuthRequire>}>
            <Route index element={<HomePage />} />
            <Route path='about' element={<AboutPage />} />
            <Route path='/recipes/:id/information' element={<RecipePage />} />
            <Route path='profile' element={<ProfilePage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
