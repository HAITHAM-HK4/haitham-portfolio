import { Routes, Route } from 'react-router-dom';
import PortfolioPage from './pages/PortfolioPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
    </Routes>
  );
}
