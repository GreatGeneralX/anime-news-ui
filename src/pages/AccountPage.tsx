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
    <>
      {/* 戻るボタン（こっちでは非表示でもOKなら消してもOK！） */}
      {/* <button
        onClick={handleClose}
        className="absolute top-4 left-4 text-2xl z-50 bg-white dark:bg-black rounded-full px-3 py-1 shadow-md"
      >
        &lt;
      </button> */}

      {/* コンテンツエリアだけ残す */}
      <div className="p-6 mt-4">
        <h2 className="text-2xl font-bold mb-4">アカウントページ</h2>
        <p className="text-gray-600 dark:text-gray-400">
          ここにプロフィールや設定を表示予定！
        </p>
      </div>
    </>
  );
}