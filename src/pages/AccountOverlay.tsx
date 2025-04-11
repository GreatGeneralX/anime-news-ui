import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function AccountOverlay() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // ← 「前のページに戻る」＝オーバーレイを閉じるだけ
  };

  return (
    <>
      {/* 背景ブラー（右半分 or 全体） */}
      <div className="fixed top-0 left-0 w-full h-full z-[9980] pointer-events-none flex">
        {/* デスクトップだけ左側にスペース */}
        <div className="w-[14rem] hidden sm:block" />
        <div
          className="flex-1 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm
                     opacity-100 pointer-events-auto"
          onClick={handleClose}
        />
      </div>

      {/* アカウントパネル */}
      <div
        className={`
          fixed top-0 left-0 h-full z-[9990]
          w-full sm:left-[14rem] sm:w-[32rem]
          bg-white dark:bg-zinc-900 shadow-xl
          flex flex-col text-black dark:text-white
        `}
      >
        {/* タイトル行 */}
        <div
          className="
            flex items-center gap-2 
            pt-16 pb-2 px-6 
            sm:pt-4 sm:pl-4 sm:pr-4 sm:pb-2
          "
        >
          {/* 戻るボタン（Lucide） */}
          <button
            onClick={handleClose}
            className="hidden sm:block text-black dark:text-white"
          >
            <ChevronLeft size={24} />
          </button>

          <h1 className="text-2xl font-bold">アカウントページ</h1>
        </div>

        {/* コンテンツ */}
        <div className="px-6 mt-2 sm:mt-0">
          <p className="text-gray-600 dark:text-gray-400">
            ここにプロフィールや設定を表示予定！
          </p>
        </div>
      </div>
    </>
  );
}
