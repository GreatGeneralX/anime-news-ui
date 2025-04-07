import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, User, Heart } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen w-[14rem]
        bg-white dark:bg-zinc-900
        border-r border-gray-200 dark:border-gray-700
        px-4 py-6 space-y-6 z-[9999]
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0
      `}
    >
      <div className="space-y-4 pt-10 sm:pt-0">
        <Link to="/" className="flex items-center gap-3 text-sm text-gundam-red w-full">
          <Home size={18} /> ニュース
        </Link>
        <Link to="/shop" className="flex items-center gap-3 text-sm text-gundam-blue w-full">
          <ShoppingBag size={18} /> ショップ
        </Link>
        <Link
          to="/account"
          state={{ backgroundLocation: location }}
          className="flex items-center gap-3 text-sm text-gundam-yellow w-full"
        >
          <User size={18} /> アカウント
        </Link>
        <Link to="/favorites" className="flex items-center gap-3 text-sm text-green-600 w-full">
          <Heart size={18} /> お気に入り
        </Link>
      </div>
    </aside>
  );
}
