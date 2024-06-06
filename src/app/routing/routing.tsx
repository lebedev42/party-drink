import { lazy } from 'react';

const Home = lazy(() => import('../../pages/home'));
const Results = lazy(() => import('../../pages/results'));

export const routing = [
  {
    key: 'home',
    path: '/',
    title: 'Home',
    component: <Home />,
  },
  {
    key: 'results',
    path: '/results',
    title: 'Results',
    component: <Results />,
  },
];
