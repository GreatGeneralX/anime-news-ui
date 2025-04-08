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
      {/* 背景ぼかし */}
      <div
        className={`
          fixed top-0 left-0 w-full h-full z-[5000]
          bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm
          transition-opacity duration-300 ease-in-out
          ${visible ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* アカウントパネル */}
      <div
        className={`
          fixed top-0 left-0 h-full w-full sm:left-[14rem] sm:w-[32rem] z-[9999]
          bg-white dark:bg-zinc-900 shadow-xl
          transition-all duration-300 ease-in-out
          ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
          flex flex-col text-black dark:text-white
        `}
      >
        {/* ←ボタンとタイトル */}
        <div className="flex items-center gap-2 pt-4 pb-2 pl-16 sm:pl-4 pr-6">
          {/* ← 戻るボタン（スマホでは非表示） */}
          <button
            onClick={handleClose}
            className="hidden sm:block text-2xl bg-white dark:bg-black rounded-full px-3 py-1 shadow-md"
          >
            &lt;
          </button>
          <h2 className="text-2xl font-bold">アカウントページ</h2>
        </div>

        {/* アカウントページコンテンツ */}
        <div className="px-6 mt-4 sm:mt-0">
          <AccountPage />
        </div>
      </div>
    </>
  );
}