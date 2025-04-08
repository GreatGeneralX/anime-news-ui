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
        {/* 左のサイドバー分だけスペース空ける */}
        <div className="w-[14rem] hidden sm:block" />
        {/* 右側にブラー背景 */}
        <div
          className="flex-1 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md
                     opacity-100 pointer-events-auto"
          onClick={handleClose}
        />
      </div>

      {/* アカウントパネル本体 */}
      <div
        className="
          fixed top-0 left-[14rem] h-full z-[9990]
          sm:w-[32rem] bg-white dark:bg-zinc-900 shadow-xl
          flex flex-col
        "
      >
        {/* ←ボタンとタイトル横並び */}
        <div className="flex items-center gap-2 p-4">
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