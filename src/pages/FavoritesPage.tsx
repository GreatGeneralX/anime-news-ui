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

// 同じダミーデータ（実際は共通化してもいいかも）
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

  useEffect(() => {
    const saved = Cookies.get('bookmarks');
    if (saved) {
      const ids = new Set(JSON.parse(saved));
      const filtered = dummyArticles.filter((a) => ids.has(a.id));
      setBookmarked(filtered);
    }
  }, []);

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">お気に入り記事</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarked.length === 0 && <p>まだお気に入りがありません🥲</p>}
        {bookmarked.map((article) => (
          <div key={article.id} className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md">
            <img src={article.thumbnail} className="w-full rounded-md mb-2" />
            <h2 className="font-bold mb-1">{article.title}</h2>
            <p className="text-xs text-gray-500 mb-1">{article.date}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{article.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
