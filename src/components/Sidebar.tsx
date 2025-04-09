import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, User, Heart, Settings } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onLinkClick?: () => void;
}

export default function Sidebar({ isOpen, onLinkClick }: SidebarProps) {
  const rawLocation = useLocation();
  const state = rawLocation.state as { backgroundLocation?: Location };
  const location = state?.backgroundLocation || rawLocation;

  const currentPath = location.pathname;
  const actualPath = window.location.pathname;

  const links = [
    {
      path: '/',
      icon: <Home size={18} />,
      label: 'ニュース',
      color: 'gundam-red',
      bgColor: 'bg-gundam-red',
    },
    {
      path: '/shop',
      icon: <ShoppingBag size={18} />,
      label: 'ショップ',
      color: 'gundam-blue',
      bgColor: 'bg-gundam-blue',
    },
    {
      path: '/account',
      icon: <User size={18} />,
      label: 'アカウント',
      color: 'gundam-yellow',
      bgColor: 'bg-gundam-yellow',
      isAccount: true,
    },
    {
      path: '/favorites',
      icon: <Heart size={18} />,
      label: 'お気に入り',
      color: 'black',
      bgColor: 'bg-black',
    },
    {
      path: '/settings',
      icon: <Settings size={18} />,
      label: '設定',
      color: 'gray-500',
      bgColor: 'bg-gray-500',
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
        transition-all duration-500 ease-out
        transform
        ${isOpen
          ? 'translate-x-0 translate-y-0 opacity-100'
          : '-translate-x-full translate-y-4 opacity-0'}
        sm:translate-x-0 sm:translate-y-0 sm:opacity-100
      `}
    >
      <div className="space-y-4 pt-10 sm:pt-0">
        {links.map(({ path, icon, label, color, isAccount, bgColor }) => {
          const isActive = actualPath === path;

          const linkState =
            isAccount && rawLocation.pathname !== '/account'
              ? { backgroundLocation: rawLocation }
              : undefined;

          return (
            <Link
              key={path}
              to={path}
              onClick={onLinkClick}
              state={linkState}
              className={`
                relative flex items-center text-sm w-full
                transition-all duration-500 ease-out
              `}
            >
              {/* ← ここをスライドさせる */}
              <span
                className={`
                  flex items-center gap-3
                  ${isActive ? 'translate-x-2 font-bold' : 'hover:translate-x-2'}
                  transition-transform duration-500 ease-out
                `}
              >
                {icon}
                {label}
              </span>
            
              {/* 左ぴょこん棒 */}
              {isActive && (
                <span
                  className={`
                    absolute -left-2 top-1/2 -translate-y-1/2
                    h-5 w-1 rounded-r
                    ${bgColor}
                  `}
                />
              )}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
