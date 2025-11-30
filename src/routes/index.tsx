// src/routes/AppRoutes.tsx
// import Layout from '../index';
import RegistrarionAndStalls from '@src/pages/RegistrarionAndStalls';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@src/Layout';
import Healthz from '@src/pages/Healthz';
import Main from '@src/pages/Main';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // ou null, se não tiver layout global
    errorElement: <Layout withError />, // error global
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'agrupamento/:nid_group_event/ano/:year',
        element: <RegistrarionAndStalls />,
      },
      {
        path: 'healthz',
        element: <Healthz />,
      },
    ],
  },
]);
