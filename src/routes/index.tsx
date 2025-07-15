// src/routes/AppRoutes.tsx
import Layout from '../index';
import Main from '@pages/Main/index.tsx';
import EventSummary from '@src/pages/EventSummary';
import ModalityDetail from '@src/pages/ModalityDetails';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    element: <Layout />,
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
    ],
  },
]);
