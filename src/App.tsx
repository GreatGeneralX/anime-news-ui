import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import AccountOverlay from './pages/AccountOverlay';

function MainRoutes() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="shop" element={<div className="mt-16">ショップページだよ🛒</div>} />
        </Route>
      </Routes>

      {/* アカウントだけオーバーレイ表示 */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/account" element={<AccountOverlay />} />
        </Routes>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  );
}