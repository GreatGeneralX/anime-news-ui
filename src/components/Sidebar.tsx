import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, User, Heart } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onLinkClick?: () => void;
}

export default function Sidebar({ isOpen, onLinkClick }: SidebarProps) {
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      baseColor: 'gundam-red',
      icon: <Home size={18} />,
      label: 'ニュース',
    },
    {
      path: '/shop',
      baseColor: 'gundam-blue',
      icon: <ShoppingBag size={18} />,
      label: 'ショップ',
    },
    {
      path: '/account',
      baseColor: 'gundam-yellow',
      icon: <User size={18} />,
      label: 'アカウント',
    },
    {
      path: '/favorites',
      baseColor: 'green-600',
      icon: <Heart size={18} />,
      label: 'お気に入り',
    },
  ];

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen w-[14rem]
        bg-white dark:bg-zinc-900
        border-r border-gray-200 dark:border-gray-700
        px-4 py-6 space-y-6 z-[9998]
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0
      `}
    >
      {/* ナビゲーションリンク */}
      <div className="space-y-4 pt-10 sm:pt-0">
        {navItems.map(({ path, baseColor, icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              onClick={onLinkClick}
              state={path === '/account' ? { backgroundLocation: location } : undefined}
              className={`
                relative flex items-center gap-3 text-sm w-full text-${baseColor}
                transition-all duration-300 ease-in-out
                ${isActive ? 'translate-x-2 font-bold' : 'hover:translate-x-1'}
              `}
            >
              {icon} {label}
              {/* 選択中の右装飾バー */}
              {isActive && (
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-${baseColor} rounded-r`}
                />
              )}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}