import { useNavigate } from 'react-router-dom';

export default function AccountOverlay() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <>
      {/* 背景ブラー（右半分のみ） */}
      <div className="fixed top-0 left-0 w-full h-full z-[9980] pointer-events-none flex">
        <div className="w-[14rem] hidden sm:block" />
        <div
          className="flex-1 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md
                     opacity-100 pointer-events-auto"
          onClick={handleClose}
        />
      </div>

      {/* 白いアカウントパネル本体（絶対に表示） */}
      <div
        className="
          fixed top-0 left-[14rem] h-full z-[9990]
          sm:w-[32rem] bg-white dark:bg-zinc-900 shadow-xl p-6
        "
      >
        {/* 戻るボタン */}
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 text-2xl bg-white dark:bg-black rounded-full px-3 py-1 shadow-md z-50"
        >
          &lt;
        </button>

        {/* パネル内容 */}
        <h2 className="text-2xl font-bold mb-4">アカウントページ</h2>
        <p className="text-gray-600 dark:text-gray-400">
          ここにプロフィールや設定を表示予定！
        </p>
      </div>
    </>
  );
}
