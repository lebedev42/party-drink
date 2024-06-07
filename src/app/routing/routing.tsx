import { lazy } from 'react';

const Home = lazy(() => import('../../pages/home'));

export const routing = [
  {
    key: 'home',
    path: '/',
    title: 'Home',
    component: <Home />,
  },
];
