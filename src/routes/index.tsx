// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import Main from '@pages/Main';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
}
