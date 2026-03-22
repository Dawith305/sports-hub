import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './lib/constants';
import { FixturesPage } from './pages/FixturesPage';
import { MatchPage } from './pages/MatchPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<FixturesPage />} />
        <Route path={ROUTES.MATCH} element={<MatchPage />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
