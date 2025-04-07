import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import AccountPage from './pages/AccountPage'; // これを追加！
import Layout from './components/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="shop" element={<div className="mt-16">ショップページだよ🛍️</div>} />
          <Route path="account" element={<AccountPage />} /> {/* ←ここ！ */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

