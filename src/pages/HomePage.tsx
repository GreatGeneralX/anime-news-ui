import { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Filter,
  ArrowUpDown,
  Heart as HeartIcon,
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

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCat, setSelectedCat] = useState('すべて');
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
    <>
      {/* ヘッダー */}
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
        <img
          src={dummyArticles[0].thumbnail}
          alt="hero"
          className="w-full rounded-xl shadow-md mb-4"
        />
        <h2 className="text-xl font-semibold mb-1">{dummyArticles[0].title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {dummyArticles[0].summary}
        </p>
      </section>

      {/* 記事グリッド */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.slice(1).map((article) => (
          <div
            key={article.id}
            className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md"
          >
            <img
              src={article.thumbnail}
              alt={article.title}
              className="rounded-md mb-2 w-full object-cover aspect-square"
            />
            <h3 className="font-bold text-md mb-1">{article.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              {article.date}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
              {article.summary}
            </p>
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
    </>
  );
}
