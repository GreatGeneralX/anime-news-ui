import { useState, useEffect } from 'react';
import {
  Home,
  ShoppingBag,
  User,
  Heart,
  Menu,
  X
} from 'lucide-react';

type Article = {
  id: number;
  category: string;
  title: string;
  date: string;
  summary: string;
  thumbnail: string;
};

const dummyArticles: Article[] = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  category: 'アニメ',
  title: `ダミー記事タイトル ${i + 1}`,
  date: '2025-04-06',
  summary: 'これはダミー記事の要約です。ここには記事の簡単な説明が表示されます。',
  thumbnail: `https://placehold.co/600x400?text=Article${i + 1}`,
}));

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCat, setSelectedCat] = useState<string>('すべて');
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleBookmark = (id: number) => {
    setBookmarks((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const filteredArticles =
    selectedCat === 'すべて'
      ? dummyArticles
      : dummyArticles.filter((a) => a.category === selectedCat);

  return (
    <div className="flex bg-white dark:bg-zinc-900 dark:text-white min-h-screen">
      {/* ハンバーガー */}
      <button
        className="fixed top-4 left-4 z-50 sm:hidden p-2 bg-white dark:bg-zinc-800 rounded shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* サイドバー */}
      <aside
        className={`fixed top-0 left-0 h-full w-56 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-gray-700 px-4 py-6 space-y-6 transform transition-transform duration-300 ease-in-out 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 sm:relative sm:block`}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Home size={18} />
            ニュース
          </div>
          <div className="flex items-center gap-3 text-sm">
            <ShoppingBag size={18} />
            ショップ
          </div>
          <div className="flex items-center gap-3 text-sm">
            <User size={18} />
            アカウント
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Heart size={18} />
            お気に入り
          </div>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 sm:ml-56 px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div key={article.id} className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md animate-fadeIn">
              <img
                src={article.thumbnail}
                alt={article.title}
                className="rounded-md mb-2 w-full object-cover h-40"
              />
              <h3 className="font-bold text-md mb-1">{article.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{article.date}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{article.summary}</p>
              <button
                onClick={() => toggleBookmark(article.id)}
                className="mt-2 text-gray-500 hover:text-blue-500"
              >
                {bookmarks.has(article.id) ? '🔖' : '📑'}
              </button>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button className="px-4 py-2 border rounded-md">さらに読み込む</button>
        </div>
      </main>
    </div>
  );
}
