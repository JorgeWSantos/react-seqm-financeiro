// src/routes/AppRoutes.tsx
import Layout from '../index';
import Main from '@pages/Main/index.tsx';
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
        path: 'modalidade/:id_prova',
        element: <ModalityDetail />,
      },
    ],
  },
]);
