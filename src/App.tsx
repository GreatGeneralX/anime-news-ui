import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
// import AccountOverlay from './pages/AccountOverlay';
import AccountPage from './pages/AccountPage'; // ← これを追加！

export default function App() {
  const location = useLocation();
  // const state = location.state as { backgroundLocation?: Location };
  // const background = state?.backgroundLocation;

  return (
    <>
      {/* 通常ページ用のルーティング */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="shop" element={<div className="mt-16">ショップページだよ🛍️</div>} />
          <Route path="account" element={<AccountPage />} /> {/* ← 通常表示に変更 */}
        </Route>
      </Routes>

      {/* オーバーレイは一旦OFF */}
      {/*
      {background && (
        <Routes>
          <Route path="/account" element={<AccountOverlay />} />
        </Routes>
      )}
      */}
    </>
  );
}
