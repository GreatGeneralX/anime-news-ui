import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import Layout from './components/Layout';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
