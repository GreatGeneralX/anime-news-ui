import { Home, ShoppingBag, User, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  activePath?: string;
  onLinkClick?: () => void;
}

export default function Sidebar({ isOpen, activePath, onLinkClick }: SidebarProps) {
  const location = useLocation();
  const currentPath = activePath ?? location.pathname;

  const links = [
    { path: '/', label: 'ニュース', icon: <Home size={18} />, color: 'text-gundam-red' },
    { path: '/shop', label: 'ショップ', icon: <ShoppingBag size={18} />, color: 'text-gundam-blue' },
    { path: '/account', label: 'アカウント', icon: <User size={18} />, color: 'text-gundam-yellow' },
    { path: '/favorites', label: 'お気に入り', icon: <Heart size={18} />, color: 'text-green-600' },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-56 bg-white dark:bg-zinc-900 
       border-r border-gray-200 dark:border-gray-700 px-4 py-6 space-y-6 z-50 
       transition-transform duration-300 ease-in-out
       ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 sm:static`}
    >
      <div className="space-y-4 pt-10 sm:pt-0">
        {links.map(({ path, label, icon, color }) => {
          const isActive = currentPath === path;
          return (
            <Link
              to={path}
              key={path}
              onClick={onLinkClick}
              className={`flex items-center gap-3 text-sm w-full ${
                isActive ? `${color} font-bold` : 'text-gray-500 hover:text-black dark:hover:text-white'
              }`}
            >
              {icon} {label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
