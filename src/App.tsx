import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { RecipePage } from './pages/RecipePage/RecipePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Header } from './components/shared/Header/Header';

import './App.scss';

const App = (): JSX.Element => (
    <div className="App">
      <Header/>
      <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/recipes/:id/information' element={<RecipePage />} />
      <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
);

export default App;
