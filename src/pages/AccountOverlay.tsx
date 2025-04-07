// components/AccountOverlay.tsx
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
        fixed top-0 left-[14rem] h-full z-[9999]
        w-[calc(100%-14rem)]  // ← 画面全体 - サイドバー幅
        bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md
        transition-all duration-300 ease-in-out
        ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        flex justify-end
      `}
     >
      <div className="w-full sm:w-[calc(50%-14rem)] bg-white dark:bg-zinc-900 h-full shadow-xl p-6 relative">
        {/* 戻るボタン */}
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 text-2xl z-50 bg-white dark:bg-black rounded-full px-3 py-1 shadow-md"
        >
          &lt;
        </button>

        <h2 className="text-2xl font-bold mb-4">アカウントページ</h2>
        <p className="text-gray-600 dark:text-gray-400">ここにプロフィールや設定を表示予定！</p>
      </div>
    </div>


  );
}
