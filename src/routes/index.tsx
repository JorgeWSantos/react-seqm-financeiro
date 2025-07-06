// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import Main from '@pages/Main/index.tsx';
import ModalityDetail from '@src/pages/ModalityDetail';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/modalidade/:id_modalidade" element={<ModalityDetail />} />
    </Routes>
  );
}
