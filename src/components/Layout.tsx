import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';
import AccountOverlay from '../pages/AccountOverlay';

interface LayoutProps {
  showAccountOverlay?: boolean;
}

export default function Layout({ showAccountOverlay = false }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 640);

  useEffect(() => {
    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 640;
      setIsDesktop(isNowDesktop);
      if (isNowDesktop) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex bg-white text-black dark:bg-zinc-900 dark:text-white h-screen overflow-hidden w-full max-w-none relative">
      {/* ハンバーガー */}
      <button
        className="fixed top-4 left-4 z-[9999] bg-white dark:bg-black p-2 rounded-md shadow-md sm:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* サイドバー */}
      <Sidebar isOpen={sidebarOpen} />

      {/* アカウントページ（表示中のみ） */}
      {isDesktop && showAccountOverlay && (
        <div className="w-96 border-l border-zinc-300 dark:border-zinc-700 h-full overflow-y-auto z-10">
          <AccountOverlay />
        </div>
      )}

      {/* メインコンテンツ */}
      <main
        className={`h-full overflow-y-auto flex-1 transition-all duration-300`}
      >
        <div className="max-w-5xl mx-auto px-6 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}