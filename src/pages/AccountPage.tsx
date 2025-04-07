import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function AccountPage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

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
        absolute top-0 left-56 sm:left-56  // ← ピクセル単位でズレないよう sm: 明示！
        h-full z-40 transition-all duration-300 ease-in-out
        bg-white dark:bg-zinc-900 shadow-lg
        ${visible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
        w-[calc(50%-14rem)]  // ← 14rem = Sidebarの幅！
        pointer-events-auto
      `}
    >
      {/* 戻るボタン */}
      <button
        onClick={handleClose}
        className="absolute top-4 left-4 text-2xl z-50 bg-white dark:bg-black rounded-full px-3 py-1 shadow-md"
      >
        &lt;
      </button>

      {/* コンテンツエリア */}
      <div className="p-6 mt-14">
        <h2 className="text-2xl font-bold mb-4">アカウントページ</h2>
        <p className="text-gray-600 dark:text-gray-400">ここにプロフィールや設定を表示予定！</p>
      </div>
    </div>
  );
}
