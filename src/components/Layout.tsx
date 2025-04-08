import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';
import AccountOverlay from '../pages/AccountOverlay';
import DebugLocation from '../DebugLocation';

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

  const handleLinkClick = () => {
    if (!isDesktop) setSidebarOpen(false);
  };

  return (
    <div className="bg-white text-black dark:bg-zinc-900 dark:text-white h-screen overflow-hidden w-full relative">
      {/* ハンバーガーメニュー */}
      <button
        className="fixed top-4 left-4 z-[10000] bg-white dark:bg-black p-2 rounded-md shadow-md sm:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* サイドバー */}
      <Sidebar isOpen={sidebarOpen} onLinkClick={handleLinkClick} />

      {/* メインエリア */}
      <div className={`flex h-full transition-all duration-300 ${isDesktop ? 'ml-56' : 'ml-0'}`}>
        {/* アカウントオーバーレイ（PCのみ） */}
        {isDesktop && showAccountOverlay && <AccountOverlay />}

        <main className="h-full overflow-y-auto flex-1">
          <div
            className={`
              w-full mx-auto
              px-4 sm:px-6 md:px-8
              ${isDesktop ? 'max-w-[calc(100vw-14rem)]' : 'max-w-screen-md'}
              lg:max-w-[72rem]
            `}
          >
            <Outlet />
            <DebugLocation /> {/* ←ここ！今表示中のURLデバッグ用 */}
          </div>
        </main>
      </div>
    </div>
  );
}
