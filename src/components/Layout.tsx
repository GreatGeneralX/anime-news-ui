// Layout.tsx
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';
import AccountOverlay from '../pages/AccountOverlay';

interface LayoutProps {
  showAccountOverlay?: boolean;
}

export default function Layout({ showAccountOverlay = false }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="relative h-screen w-full bg-white dark:bg-zinc-900 text-black dark:text-white">
      {/* ハンバーガー */}
      <button
        className="fixed top-4 left-4 z-[30] bg-white dark:bg-black p-2 rounded-md shadow-md sm:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* サイドバー */}
      <Sidebar isOpen={sidebarOpen} />

      {/* メインコンテンツ（レスポンシブ対応）*/}
      <main className="h-full overflow-y-auto pt-6 pr-4 transition-all duration-300 ease-in-out pl-0 sm:pl-[14rem]">
        <Outlet />
      </main>

      {/* アカウントオーバーレイ */}
      {showAccountOverlay && <AccountOverlay />}
    </div>
  );
}