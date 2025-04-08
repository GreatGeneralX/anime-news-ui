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
        h-full relative
        transition-all duration-300 ease-in-out
        ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
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