import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, User, Heart } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onLinkClick?: () => void;
}

export default function Sidebar({ isOpen, onLinkClick }: SidebarProps) {
  const location = useLocation();

  // ✅ オーバーレイで /account が出てる場合も currentPath を /account に補正
  const currentPath =
    location.state?.backgroundLocation?.pathname === '/account'
      ? '/account'
      : location.pathname;

  const links = [
    {
      path: '/',
      icon: <Home size={18} />,
      label: 'ニュース',
      color: 'gundam-red',
    },
    {
      path: '/shop',
      icon: <ShoppingBag size={18} />,
      label: 'ショップ',
      color: 'gundam-blue',
    },
    {
      path: '/account',
      icon: <User size={18} />,
      label: 'アカウント',
      color: 'gundam-yellow',
      isAccount: true,
    },
    {
      path: '/favorites',
      icon: <Heart size={18} />,
      label: 'お気に入り',
      color: 'black',
    },
  ];

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen w-[14rem]
        bg-white dark:bg-zinc-900
        border-r border-gray-200 dark:border-gray-700
        px-4 py-6 space-y-6
        z-[9998]
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0
      `}
    >
      <div className="space-y-4 pt-10 sm:pt-0">
        {links.map(({ path, icon, label, color, isAccount }) => {
          const isActive = currentPath === path;

          const linkState =
            isAccount && location.pathname !== '/account'
              ? { backgroundLocation: location }
              : undefined;

          return (
            <Link
              key={path}
              to={path}
              onClick={onLinkClick}
              state={linkState}
              className={`
                flex items-center gap-3 text-sm w-full
                text-${color}
                transition-all duration-300 ease-in-out
                ${isActive ? 'translate-x-2 font-bold' : 'hover:translate-x-1'}
              `}
            >
              {icon}
              {label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
