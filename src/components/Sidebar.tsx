import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, User, Heart } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onLinkClick?: () => void; // ← サイドバーのリンクが押されたとき用
}

export default function Sidebar({ isOpen, onLinkClick }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen w-[14rem]
        bg-white dark:bg-zinc-900
        border-r border-gray-200 dark:border-gray-700
        px-4 py-6 space-y-6
        z-[9998]  /* ← ハンバーガーより下に表示する！ */
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0
      `}
    >
      {/* ナビゲーションリンク */}
      <div className="space-y-4 pt-10 sm:pt-0">
        <Link
          to="/"
          onClick={onLinkClick}
          className={`flex items-center gap-3 text-sm text-gundam-red w-full relative
            ${location.pathname === '/' ? 'font-bold after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-5 after:w-1 after:bg-gundam-red' : ''}
          `}
        >
          <Home size={18} /> ニュース
        </Link>

        <Link
          to="/shop"
          onClick={onLinkClick}
          className={`flex items-center gap-3 text-sm text-gundam-blue w-full relative
            ${location.pathname === '/shop' ? 'font-bold after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-5 after:w-1 after:bg-gundam-blue' : ''}
          `}
        >
          <ShoppingBag size={18} /> ショップ
        </Link>

        <Link
          to="/account"
          state={{ backgroundLocation: location }}
          onClick={onLinkClick}
          className={`flex items-center gap-3 text-sm text-gundam-yellow w-full relative
            ${location.pathname === '/account' ? 'font-bold after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-5 after:w-1 after:bg-gundam-yellow' : ''}
          `}
        >
          <User size={18} /> アカウント
        </Link>

        <Link
          to="/favorites"
          onClick={onLinkClick}
          className={`flex items-center gap-3 text-sm text-green-600 w-full relative
            ${location.pathname === '/favorites' ? 'font-bold after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-5 after:w-1 after:bg-green-600' : ''}
          `}
        >
          <Heart size={18} /> お気に入り
        </Link>
      </div>
    </aside>
  );
}