import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';
import AccountOverlay from '../pages/AccountOverlay';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // アカウントページだけはオーバーレイで出したい
  const isAccountOverlay = location.pathname === '/account';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex bg-white text-black dark:bg-zinc-900 dark:text-white h-screen overflow-hidden w-full max-w-none relative">

      {/* ハンバーガー（スマホ用） */}
      <button
        className="fixed top-4 left-4 z-[10001] bg-white dark:bg-black p-2 rounded-md shadow-md sm:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* サイドバー */}
      <Sidebar isOpen={sidebarOpen} />

      {/* メイン画面 */}
      <main className="h-full overflow-y-auto px-6 py-6 w-full max-w-none z-0">
        <Outlet />
      </main>

      {/* アカウントページをオーバーレイで出す */}
      {isAccountOverlay && <AccountOverlay />}
    </div>
  );
}