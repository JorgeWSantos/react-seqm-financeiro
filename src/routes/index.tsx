// src/routes/AppRoutes.tsx
// import Layout from '../index';
import Main from '@pages/Main/index.tsx';
import EventSummary from '@src/pages/EventSummary';
import ModalityDetail from '@src/pages/ModalityDetails';
import Top10 from '@src/pages/Top10';
import Classificatory from '@src/pages/Classificatory';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@src/Layout';
import { ErrorElement } from '@src/ErrorElements';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // ou null, se não tiver layout global
    errorElement: <ErrorElement />, // error global
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'modalidade/:prove_id',
        element: <ModalityDetail />,
      },
      {
        path: 'modalidade/:prove_id/evento/:event_id',
        element: <EventSummary />,
      },
      {
        path: 'modalidade/:prove_id/evento/:event_id/prova-evento/:prove_event_id/top10',
        element: <Top10 />,
      },
      {
        path: 'modalidade/:prove_id/evento/:event_id/prova-evento/:prove_event_id/classificatoria/:id_classificatory',
        element: <Classificatory />,
      },
    ],
  },
]);
