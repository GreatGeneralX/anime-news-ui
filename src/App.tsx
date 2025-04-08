import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import AccountPage from './pages/AccountPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="shop" element={<div className="mt-16">ショップページだよ🛍️</div>} />
        <Route path="account" element={<AccountPage />} /> {/* ← ここで通常表示 */}
      </Route>
    </Routes>
  );
}
