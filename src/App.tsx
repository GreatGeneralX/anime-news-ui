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
  Bookmark,
  BookmarkCheck,
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
  date: '2025-04-01',
  summary: 'これはダミー記事の要約です。ここには記事の簡単な説明が表示されます。',
  thumbnail: `https://placehold.co/600x400?text=Article+${i + 1}`,
}));

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [selectedCat, setSelectedCat] = useState<string>('すべて');
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());

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
    <div className="flex bg-white text-black dark:bg-zinc-900 dark:text-white min-h-screen">
      <aside className="fixed top-0 left-0 h-screen w-56 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-gray-700 px-4 py-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm"><Home size={18} />ニュース</div>
          <div className="flex items-center gap-3 text-sm"><ShoppingBag size={18} />ショップ</div>
          <div className="flex items-center gap-3 text-sm"><User size={18} />アカウント</div>
          <div className="flex items-center gap-3 text-sm"><Heart size={18} />お気に入り</div>
        </div>
      </aside>

      <main className="flex-1 ml-56 px-6 py-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-4">ニュースルーム</h1>
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={() => setDarkMode(!darkMode)}>{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
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
            <button className="ml-auto px-2 py-1 text-sm flex items-center gap-1 border rounded-md">
              <Filter size={16} /> フィルター
            </button>
            <button className="px-2 py-1 text-sm flex items-center gap-1 border rounded-md">
              <ArrowUpDown size={16} /> 並べ替え
            </button>
          </div>
        </header>

        <section className="mb-10">
          <img src={dummyArticles[0].thumbnail} alt="hero" className="w-full rounded-xl shadow-md mb-4" />
          <h2 className="text-xl font-semibold mb-1">{dummyArticles[0].title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{dummyArticles[0].summary}</p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.slice(1).map((article) => (
            <div key={article.id} className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md">
              <img src={article.thumbnail} alt={article.title} className="rounded-md mb-2 w-full object-cover h-40" />
              <h3 className="font-bold text-md mb-1">{article.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{article.date}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{article.summary}</p>
              <button
                onClick={() => toggleBookmark(article.id)}
                className="mt-2 text-gray-500 hover:text-blue-500"
              >
                {bookmarks.has(article.id) ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
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
