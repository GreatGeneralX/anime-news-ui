// src/App.tsx
//ここまでコード
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import ShopPage from './pages/ShopPage';
import SettingsPage from './pages/SettingsPage';
import AccountOverlay from './pages/AccountOverlay';

//import FolderPage from './pages/FolderPage'; // 通常フォルダー
import FolderPageA from './pages/FolderPageA';
import FolderPageB from './pages/FolderPageB';
import ParallelFolderRouter from './pages/ParallelFolderRouter';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const isOverlay = location.pathname === '/account';

  console.log("📍 App.tsx loaded");
  console.log("📍 current path:", location.pathname);

  return (
    <DndProvider backend={HTML5Backend}>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          {/*<Route path="favorites/folder/:id" element={<FolderPage />} />*/}
          <Route path="shop" element={<ShopPage />} />
          <Route path="settings" element={<SettingsPage />} />

          {/* ✅ 実験用フォルダールーティング */}
          <Route path="favorites/folder/:id" element={<ParallelFolderRouter />} />
          <Route path="favorites/folder/:id/a" element={<FolderPageA />} />
          <Route path="favorites/folder/:id/b" element={<FolderPageB />} />

        </Route>
      </Routes>

      {state?.backgroundLocation || isOverlay ? (
        <Routes>
          <Route path="/account" element={<AccountOverlay />} />
        </Routes>
      ) : null}
    </DndProvider>
  );
}
//ここまでコード