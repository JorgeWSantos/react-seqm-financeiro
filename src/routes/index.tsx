// src/routes/AppRoutes.tsx
// import Layout from '../index';
import Classificatory from '@src/pages/Classificatory';
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
        path: 'modalidade/:prove_id/evento/:event_id/prova-evento/:prove_event_id/classificatoria/:id_classificatory',
        element: <Classificatory />,
      },
      {
        path: 'healthz',
        element: <Healthz />,
      },
    ],
  },
]);
