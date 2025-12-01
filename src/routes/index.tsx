// src/routes/AppRoutes.tsx
// import Layout from '../index';
import InscriptionsAndStalls from '@src/pages/InscriptionsAndStalls';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@src/Layout';
import Healthz from '@src/pages/Healthz';
import Main from '@src/pages/Main';
import { PrivateRoute } from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // ou null, se não tiver layout global
    errorElement: <Layout withError />, // error global
    children: [
      {
        index: true,
        element: (
          <PrivateRoute path="">
            <Main />
          </PrivateRoute>
        ),
      },
      {
        path: 'agrupamento/:nid_group_event/ano/:year',
        element: (
          <PrivateRoute path="">
            <InscriptionsAndStalls />
          </PrivateRoute>
        ),
      },
      {
        path: 'healthz',
        element: <Healthz />,
      },
    ],
  },
]);
