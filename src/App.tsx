import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import AccountOverlay from './pages/AccountOverlay';

export default function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const background = state?.backgroundLocation;

  return (
    <>
      {/* 通常ページ用のルーティング */}
      <Routes location={background || location}>
        <Route path="/" element={<Layout showAccountOverlay={!!background} />}>
          <Route index element={<HomePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="shop" element={<div className="mt-16">ショップページだよ🛍️</div>} />
        </Route>
      </Routes>

      {/* オーバーレイ（アカウント）だけ追加で表示 */}
      {background && (
        <Routes>
          <Route path="/account" element={<AccountOverlay />} />
        </Routes>
      )}
    </>
  );
}
