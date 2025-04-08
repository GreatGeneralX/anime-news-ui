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
        {/* 左のサイドバー分だけスペース空ける（sm以上だけ） */}
        <div className="w-[14rem] hidden sm:block" />
        {/* 右側のブラー背景 */}
        <div
          className="flex-1 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm
                     opacity-100 pointer-events-auto"
          onClick={handleClose}
        />
      </div>

      {/* アカウントパネル本体（スマホは全画面） */}
      <div
        className={`
          fixed top-0 left-0 h-full z-[9990]
          w-full sm:left-[14rem] sm:w-[32rem]
          bg-white dark:bg-zinc-900 shadow-xl
          flex flex-col text-black dark:text-white
        `}
      >
        {/* ←ボタンとタイトル（スマホでハンバーガーと被らないようにpx調整） */}
        <div className="flex items-center gap-2 pt-4 pb-2 px-6 sm:px-4 sm:pt-4 sm:pb-2 sm:pl-4">
          <button
            onClick={handleClose}
            className="text-2xl bg-white dark:bg-black rounded-full px-3 py-1 shadow-md z-50"
          >
            &lt;
          </button>
          <h2 className="text-2xl font-bold">アカウントページ</h2>
        </div>

        {/* 本文コンテンツ */}
        <div className="px-6">
          <p className="text-gray-600 dark:text-gray-400">
            ここにプロフィールや設定を表示予定！
          </p>
        </div>
      </div>
    </>
  );
}