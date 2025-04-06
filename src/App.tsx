import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function SidebarTest() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-black dark:text-white">
      {/* ハンバーガー */}
      <button
        className="fixed top-4 left-4 z-[9999] bg-white dark:bg-black p-2 rounded-md shadow-md sm:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* サイドバー */}
      <aside
        className={`fixed top-0 left-0 h-full w-56 bg-white dark:bg-zinc-800 border-r border-gray-200 dark:border-gray-700 px-4 py-6 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 sm:relative sm:block`}
      >
        <div className="space-y-4">
          <div>メニュー1</div>
          <div>メニュー2</div>
          <div>メニュー3</div>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <main className="sm:ml-56 p-6">
        <h1 className="text-2xl font-bold mb-4">Hello, Sidebar!</h1>
        <p>これはハンバーガーメニューの動作確認用テストです。</p>
      </main>
    </div>
  );
}
