import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routing } from './routing';

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      {routing.map((route) => (
        <Route key={route.key} path={route.path} element={route.component} />
      ))}
    </Routes>
  </BrowserRouter>
);

export default Router;
