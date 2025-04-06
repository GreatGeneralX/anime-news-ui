// src/components/Sidebar.tsx
import { Home, ShoppingBag, User, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="w-56 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-gray-700 px-4 py-6 space-y-6 z-50">

      <div className="space-y-4 pt-10 sm:pt-0">
        <Link to="/" className="flex items-center gap-3 text-sm text-gundam-red w-full">
          <Home size={18} />ニュース
        </Link>
        <Link to="/shop" className="flex items-center gap-3 text-sm text-gundam-blue w-full">
          <ShoppingBag size={18} />ショップ
        </Link>
        <Link to="/account" className="flex items-center gap-3 text-sm text-gundam-yellow w-full">
          <User size={18} />アカウント
        </Link>
        <Link to="/favorites" className="flex items-center gap-3 text-sm text-green-600 w-full">
          <Heart size={18} />お気に入り
        </Link>
      </div>
    </aside>
  );
}
