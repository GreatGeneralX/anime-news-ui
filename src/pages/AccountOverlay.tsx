// AccountOverlay.tsx
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
    <>
      {/* 🔹 背景ブラー：サイドバー以外にかける */}
      <div className="fixed top-0 left-0 w-full h-full z-[9980] pointer-events-none flex">
        {/* 左：サイドバー領域は除外 */}
        <div className="w-[14rem] hidden sm:block" />

        {/* 右：ブラーかける部分 */}
        <div
          className={`
            flex-1 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md
            transition-opacity duration-300 ease-in-out
            ${visible ? 'opacity-100' : 'opacity-0'}
            pointer-events-auto
          `}
          onClick={handleClose}
        />
      </div>

      {/* 🔸 アカウントパネル本体 */}
      <div
        className={`
          fixed top-0 left-[14rem] h-full z-[9990] transition-all duration-300 ease-in-out
          ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
          sm:w-[32rem] bg-white dark:bg-zinc-900 shadow-xl p-6 relative
        `}
      >
        {/* 戻るボタン */}
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 text-2xl bg-white dark:bg-black rounded-full px-3 py-1 shadow-md z-50"
        >
          &lt;
        </button>

        {/* 内容 */}
        <h2 className="text-2xl font-bold mb-4">アカウントページ</h2>
        <p className="text-gray-600 dark:text-gray-400">
          ここにプロフィールや設定を表示予定！
        </p>
      </div>
    </>
  );
}