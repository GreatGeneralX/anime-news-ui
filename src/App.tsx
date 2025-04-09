import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import AccountOverlay from './pages/AccountOverlay';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const isOverlay = location.pathname === "/account";

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="shop" element={<div className="mt-16">ショップページだよ🛍️</div>} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>

      {(state?.backgroundLocation || isOverlay) && (
        <Routes>
          <Route path="/account" element={<AccountOverlay />} />
        </Routes>
      )}
    </>
  );
}

// この1行で再デプロイできる！
// 🧼 Force redeploy trigger

// App.tsx の一番下に1行追加するだけでもOK
// App.tsx の一番下に1行追加するだけでもOK