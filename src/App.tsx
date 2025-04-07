// App.tsx
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
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

  const showAccountOverlay = location.pathname === '/account';

  return (
    <Routes location={location}>
      <Route
        path="/"
        element={<Layout showAccountOverlay={showAccountOverlay} />}
      >
        <Route index element={<HomePage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="shop" element={<div className="mt-16">ショップページだよ🛍️</div>} />
      </Route>
    </Routes>
  );
}
