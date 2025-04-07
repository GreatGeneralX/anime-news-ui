import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';
import AccountOverlay from '../pages/AccountOverlay';

// ← ここで型を指定してpropsを受け取る
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
    <div className="flex bg-white text-black dark:bg-zinc-900 dark:text-white h-screen overflow-hidden w-full max-w-none relative">
  
      {/* ハンバーガー */}
      <button
        className="fixed top-4 left-4 z-[9990] bg-white dark:bg-black p-2 rounded-md shadow-md sm:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
  
      {/* サイドバー */}
      <Sidebar isOpen={sidebarOpen} />
  
      {/* メイン */}
      <main className="relative h-full overflow-y-auto py-6 w-full max-w-none pl-0">
        <Outlet />
      </main>
  
      {/* 🔥 外に出す */}
      {showAccountOverlay && <AccountOverlay />}
    </div>
  );
  
}
