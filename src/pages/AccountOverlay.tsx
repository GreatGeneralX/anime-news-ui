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
          fixed top-0 left-[14rem] w-[calc(100%-14rem)] h-full z-[5000]
          bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm
          transition-opacity duration-300 ease-in-out
          ${visible ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* アカウントパネル */}
      <div
        className={`
          fixed top-0 left-[14rem] h-full w-full sm:w-[calc(50%-14rem)] z-[9999]
          bg-white dark:bg-zinc-900 shadow-xl
          transition-all duration-300 ease-in-out
          ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        `}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 text-2xl z-50 bg-white dark:bg-black rounded-full px-3 py-1 shadow-md"
        >
          &lt;
        </button>

        <div className="p-6 mt-14">
          <AccountPage />
        </div>
      </div>
    </>
  );
}