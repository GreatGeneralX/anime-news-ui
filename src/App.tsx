// App.tsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
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
    <Routes location={state?.backgroundLocation || location}>
      {/* 通常レイアウト */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="shop" element={<div className="mt-16">ショップページだよ🛍️</div>} />
      </Route>

      {/* アカウントはオーバーレイ付きのレイアウトで表示 */}
      <Route path="/account" element={<Layout showAccountOverlay={true} />}></Route>
    </Routes>
  );
}
