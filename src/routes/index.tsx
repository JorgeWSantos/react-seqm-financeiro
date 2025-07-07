// src/routes/AppRoutes.tsx
import Layout from '../index';
import Main from '@pages/Main/index.tsx';
import ModalityDetail from '@src/pages/ModalityDetail';
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
        path: 'modalidade/:id_modalidade',
        element: <ModalityDetail />,
      },
    ],
  },
]);

// export function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<Main />} />
//       <Route path="/modalidade/:id_modalidade" element={<ModalityDetail />} />
//     </Routes>
//   );
// }
