// pages/AccountOverlay.tsx
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
    <div
      className={`
        fixed inset-0 z-[9998] 
        pointer-events-none
      `}
    >
      {/* ぼかし用の背景オーバーレイ */}
      <div
        className={`
          absolute inset-0 transition-all duration-300 ease-in-out 
          bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm
          ${visible ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* アカウントサイドパネル（サイドバー横に表示） */}
      <div
        className={`
          fixed top-0 left-[14rem] h-full z-[9999]
          w-[calc(50%-14rem)] bg-white dark:bg-zinc-900 shadow-lg
          transition-all duration-300 ease-in-out
          ${visible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}
          flex flex-col p-6
        `}
      >
        {/* 戻るボタン */}
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 text-2xl bg-white dark:bg-black rounded-full px-3 py-1 shadow-md z-[10000]"
        >
          &lt;
        </button>

        <h2 className="text-2xl font-bold mb-4 ml-10">アカウントページ</h2>
        <p className="text-gray-600 dark:text-gray-400 ml-10">
          ここにプロフィールや設定を表示予定！
        </p>
      </div>
    </div>
  );
}
