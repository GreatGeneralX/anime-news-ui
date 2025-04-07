import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import AccountOverlay from './pages/AccountOverlay'; // 追加
import Layout from './components/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  );
}

function MainRoutes() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      {/* 通常のページたち */}
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="shop" element={<div className="mt-16">ショップページだよ🛍️</div>} />
        </Route>
      </Routes>

      {/* アカウントをモーダル的にオーバーレイ表示 */}
      <Routes>
        <Route path="/account" element={<AccountOverlay />} />
      </Routes>
    </>
  );
}
