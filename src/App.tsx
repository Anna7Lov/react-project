import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { RecipePage } from './pages/RecipePage/RecipePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Layout } from './components/shared/Layout/Layout';
import './App.scss';

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
      <Route path='/' element={<Layout onThemeChanged={onThemeChanged} theme={theme} />}>
      <Route index element={<HomePage />} />
      <Route path='/recipes/:id/information' element={<RecipePage />} />
      <Route path='*' element={<NotFoundPage />} />
      </Route>
      </Routes>
    </div>
    </ThemeContext.Provider>
  );
};

export default App;
