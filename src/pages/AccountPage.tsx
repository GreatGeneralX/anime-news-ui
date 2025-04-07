import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function AccountPage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // マウント時にスライド表示
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      navigate('/');
    }, 300); // アニメーション後に戻る
  };

  return (
    <div
      className={`
        fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out
        bg-white dark:bg-zinc-900 shadow-lg
        ${visible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
        w-full sm:w-1/2
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
