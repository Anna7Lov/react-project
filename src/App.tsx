import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthorizationPage } from './pages/AuthorizationPage/AuthorizationPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { HomePage } from './pages/HomePage/HomePage';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { RecipePage } from './pages/RecipePage/RecipePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Layout } from './components/shared/Layout/Layout';
import './App.scss';
import { AuthRequire } from './components/shared/AuthRequire/AuthRequire';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';

export const ThemeContext = React.createContext('light');

const App = (): JSX.Element => {
  const [theme, setTheme] = React.useState('light');

  const onThemeChanged = React.useCallback(
    (checked: boolean) => {
      if (checked) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    }, []);

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
