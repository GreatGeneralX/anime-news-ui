import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="fixed top-0 left-0 w-full h-full z-[9998] pointer-events-none">
      {/* 背景ブラー */}
      <div
        className={`
          absolute inset-0 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md
          transition-opacity duration-300 ease-in-out
          ${visible ? 'opacity-100' : 'opacity-0'}
          pointer-events-auto
        `}
        onClick={handleClose}
      />

      {/* アカウント本体 */}
      <div
        className={`
          fixed top-0 h-full z-[9999] transition-all duration-300 ease-in-out
          ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
          bg-white dark:bg-zinc-900 shadow-xl p-6 relative
          w-full sm:w-[32rem] sm:left-56
        `}
      >
        {/* 戻るボタン */}
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 text-2xl bg-white dark:bg-black rounded-full px-3 py-1 shadow-md z-50"
        >
          &lt;
        </button>

        {/* コンテンツ */}
        <h2 className="text-2xl font-bold mb-4 pl-10">アカウントページ</h2>
        <p className="text-gray-600 dark:text-gray-400">
          ここにプロフィールや設定を表示予定！
        </p>
      </div>
    </div>
  );
}
