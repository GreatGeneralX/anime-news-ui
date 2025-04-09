import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface Article {
  id: number;
  category: string;
  title: string;
  date: string;
  summary: string;
  thumbnail: string;
}

const dummyArticles: Article[] = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  category: ['すべて', 'アニメ', 'グッズ', 'ゲーム', 'Vtuber', 'コスプレ'][(i + 1) % 6],
  title: `ダミー記事タイトル ${i + 1}`,
  date: '2025-04-06',
  summary: 'これはダミー記事の要約です。',
  thumbnail: `https://placehold.co/600x400?text=Article${i + 1}`,
}));

export default function FavoritesPage() {
  const [bookmarked, setBookmarked] = useState<Article[]>([]);
  const [balloons, setBalloons] = useState<{ id: number }[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const saved = Cookies.get('bookmarks');
    if (saved) {
      const ids = new Set(JSON.parse(saved));
      const filtered = dummyArticles.filter((a) => ids.has(a.id));
      setBookmarked(filtered);
    }
  }, []);

  const handleBalloon = () => {
    const isEnabled = localStorage.getItem('action_heartBalloon') !== 'false';
    if (!isEnabled) return;

    const id = count + 1;
    setCount(id);
    setBalloons([...balloons, { id }]);

    setTimeout(() => {
      setBalloons((prev) => prev.filter((b) => b.id !== id));
    }, 1500);
  };

  return (
    <div className="mt-16 sm:mt-0 px-4">
      <h1 className="text-2xl font-bold mb-4">お気に入り記事</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarked.length === 0 && <p>まだお気に入りがありません🥲</p>}
        {bookmarked.map((article) => (
          <div
            key={article.id}
            className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md relative overflow-hidden"
          >
            <img src={article.thumbnail} className="w-full rounded-md mb-2" />
            <h2 className="font-bold mb-1">{article.title}</h2>
            <p className="text-xs text-gray-500 mb-1">{article.date}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
              {article.summary}
            </p>
            <button
              onClick={handleBalloon}
              className="absolute top-2 right-2 text-pink-500 hover:scale-110 transition-transform"
            >
              ❤
            </button>
          </div>
        ))}
      </div>

      {/* バルーンエフェクト */}
      <div className="relative h-0">
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            className="absolute left-1/2 transform -translate-x-1/2 text-pink-400 text-2xl animate-float"
          >
            🎈
          </div>
        ))}
      </div>
    </div>
  );
} 