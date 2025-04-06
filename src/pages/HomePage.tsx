import { useState, useEffect } from 'react';
import {
  Home,
  ShoppingBag,
  User,
  Heart,
  Sun,
  Moon,
  Filter,
  ArrowUpDown,
  Heart as HeartIcon,
  HeartCrack,
  Menu,
  X,
} from 'lucide-react';

interface Article {
  id: number;
  category: string;
  title: string;
  date: string;
  summary: string;
  thumbnail: string;
}

const categories: string[] = ['すべて', 'アニメ', 'グッズ', 'ゲーム', 'Vtuber', 'コスプレ'];

const dummyArticles: Article[] = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  category: categories[(i + 1) % categories.length],
  title: `ダミー記事タイトル ${i + 1}`,
  date: '2025-04-06',
  summary: 'これはダミー記事の要約です。ここには記事の簡単な説明が表示されます。',
  thumbnail: `https://placehold.co/600x400?text=Article${i + 1}`,
}));

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCat, setSelectedCat] = useState('すべて');
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="bg-white text-black dark:bg-zinc-900 dark:text-white h-screen overflow-hidden">
      {/* ハンバーガー（スマホ用） */}
      <button
        className="fixed top-4 left-4 z-[9999] bg-white dark:bg-black p-2 rounded-md shadow-md sm:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* サイドバー */}
      <aside
        className={`fixed top-0 left-0 h-screen w-56 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-gray-700 px-4 py-6 space-y-6 z-50
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
      >
        <div className="space-y-4 pt-10 sm:pt-0">
          <button className="flex items-center gap-3 text-sm text-gundam-red w-full">
            <Home size={18} />ニュース
          </button>
          <button className="flex items-center gap-3 text-sm text-gundam-blue w-full">
            <ShoppingBag size={18} />ショップ
          </button>
          <button className="flex items-center gap-3 text-sm text-gundam-yellow w-full">
            <User size={18} />アカウント
          </button>
          <button className="flex items-center gap-3 text-sm text-green-600 w-full">
            <Heart size={18} />お気に入り
          </button>
        </div>
      </aside>

      {/* メイン */}
      <main className="ml-0 sm:ml-56 h-full overflow-y-auto px-6 py-6 max-w-screen-xl mx-auto">

        <header className="mb-6 sm:pl-2">
          <h1 className="text-3xl font-bold mb-4 sm:pl-10 sm:mt-2 mt-14 sm:mt-0">ニュースルーム</h1>
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1 rounded-md text-sm border transition ${
                  selectedCat === cat
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button className="px-2 py-1 text-sm flex items-center gap-1 border rounded-md">
              <Filter size={16} /> フィルター
            </button>
            <button className="px-2 py-1 text-sm flex items-center gap-1 border rounded-md">
              <ArrowUpDown size={16} /> 並べ替え
            </button>
          </div>
        </header>

        {/* ヒーロー記事 */}
        <section className="mb-10">
          <img src={dummyArticles[0].thumbnail} alt="hero" className="w-full rounded-xl shadow-md mb-4" />
          <h2 className="text-xl font-semibold mb-1">{dummyArticles[0].title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{dummyArticles[0].summary}</p>
        </section>

        {/* 記事グリッド */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.slice(1).map((article) => (
            <div key={article.id} className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md">
              <img src={article.thumbnail} alt={article.title} className="rounded-md mb-2 w-full object-cover aspect-square" />
              <h3 className="font-bold text-md mb-1">{article.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{article.date}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{article.summary}</p>
              <button
                onClick={() => toggleBookmark(article.id)}
                className={`mt-2 ${
                      bookmarks.has(article.id) ? 'text-red-400' : 'text-gray-400'
                        } hover:text-red-500`}
              >
  <HeartIcon
    size={20}
    fill={bookmarks.has(article.id) ? 'currentColor' : 'none'}
  />
</button>

            </div>
          ))}
        </section>

        <div className="mt-10 text-center">
          <button className="px-4 py-2 border rounded-md">さらに読み込む</button>
        </div>
      </main>
    </div>
  );
}
