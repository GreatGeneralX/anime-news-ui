import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Edit3, X } from 'lucide-react'; // ← 追加！

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
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const saved = Cookies.get('bookmarks');
    if (saved) {
      const ids = new Set(JSON.parse(saved));
      const filtered = dummyArticles.filter((a) => ids.has(a.id));
      setBookmarked(filtered);
    }
  }, []);

  const toggleBookmark = (id: number) => {
    const saved = Cookies.get('bookmarks');
    if (!saved) return;

    const ids = new Set<number>(JSON.parse(saved));
    ids.delete(id);
    Cookies.set('bookmarks', JSON.stringify(Array.from(ids)));

    setBookmarked((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="mt-16 sm:mt-0 px-4 relative">
      {/* 編集ボタン */}
      <button
        className="absolute top-4 right-4 z-10 hover:text-gray-500 transition-colors"
        onClick={() => setEditMode(!editMode)}
      >
        <Edit3 size={20} className="text-gray-400 dark:text-gray-300" />
      </button>


      <h1 className="text-2xl font-bold mb-4">お気に入り記事</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {bookmarked.length === 0 && <p>まだお気に入りがありません🥲</p>}
        {bookmarked.map((article) => (
          <div
            key={article.id}
            className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md relative"
          >
            {/* 編集モード時のみ ✕ ボタン表示 */}
            {editMode && (
              <button
                onClick={() => toggleBookmark(article.id)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors"
              >
                <X size={16} />
              </button>
            )}
            <img src={article.thumbnail} className="w-full rounded-md mb-2" />
            <h2 className="font-bold mb-1">{article.title}</h2>
            <p className="text-xs text-gray-500 mb-1">{article.date}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
              {article.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
