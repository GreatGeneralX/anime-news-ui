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
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 640);

  useEffect(() => {
    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 640;
      setIsDesktop(isNowDesktop);
      if (isNowDesktop) {
        setSidebarOpen(false); // デスクトップでは常に開いてる状態なのでモバイル用開閉をオフ
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // サイドバーが閉じられるように渡す関数
  const handleLinkClick = () => {
    if (!isDesktop) setSidebarOpen(false);
  };

  return (
    <div className="bg-white text-black dark:bg-zinc-900 dark:text-white h-screen overflow-hidden w-full max-w-none relative">
      {/* ハンバーガーメニュー */}
      <button
        className="fixed top-4 left-4 z-[9999] bg-white dark:bg-black p-2 rounded-md shadow-md sm:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* サイドバー */}
      <Sidebar isOpen={sidebarOpen} onLinkClick={handleLinkClick} />

      {/* メインコンテンツエリア */}
      <div className={`flex h-full transition-all duration-300 ${isDesktop ? 'ml-48' : 'ml-0'}`}>
        {/* アカウントページオーバーレイ（デスクトップのみ） */}
        {isDesktop && showAccountOverlay && <AccountOverlay />}

        {/* メイン */}
        <main className="h-full overflow-y-auto flex-1">
          <div className="max-w-5xl mx-auto px-6 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}