import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountPage from './AccountPage';

export default function AccountOverlay() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  return (
    <>
      {/* 背景ぼかし（Sidebarの右から画面右端まで） */}
      <div
        className={`
          absolute top-0 left-0 w-full h-full z-40
          bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm
          transition-opacity duration-300 ease-in-out
          ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      />

      {/* アカウントパネル（横並びに置く） */}
      <div
        className={`
          relative z-50 w-96 h-full
          bg-white dark:bg-zinc-900 border-l border-zinc-300 dark:border-zinc-700
          transition-all duration-300 ease-in-out
          ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
        `}
      >
        {/* 閉じるボタン */}
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 text-2xl z-50 bg-white dark:bg-black rounded-full px-3 py-1 shadow-md"
        >
          &lt;
        </button>

        {/* アカウントページ本体 */}
        <div className="p-6 mt-14">
          <AccountPage />
        </div>
      </div>
    </>
  );
}