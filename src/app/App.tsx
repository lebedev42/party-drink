import { Suspense, lazy } from 'react';
import { MainLayout } from './ui';

const Router = lazy(() => import('./routing/Router'));

const App = () => (
  <MainLayout>
    <Suspense fallback={<></>}>
      <Router />
    </Suspense>
  </MainLayout>
);

export default App;
