import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import FolderCard from '../components/FolderCard';
import { Edit3, FolderPlus } from 'lucide-react';

interface Article {
  id: number;
  category: string;
  title: string;
  date: string;
  summary: string;
  thumbnail: string;
}

interface Folder {
  id: number;
  name: string;
  description: string;
  color: string;
}

// ダミー記事データ（実際は共通化してもOK）
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
  const [folders, setFolders] = useState<Folder[]>([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const saved = Cookies.get('bookmarks');
    if (saved) {
      const ids = new Set(JSON.parse(saved));
      const filtered = dummyArticles.filter((a) => ids.has(a.id));
      setBookmarked(filtered);
    }
  }, []);

  const handleAddFolder = () => {
    const newId = folders.length + 1;
    setFolders([
      ...folders,
      {
        id: newId,
        name: `新しいフォルダー ${newId}`,
        description: '説明を追加できます',
        color: 'gundam-red',
      },
    ]);
  };

  const handleUpdateFolder = (id: number, name: string, desc: string, color: string) => {
    setFolders((prev) =>
      prev.map((f) => (f.id === id ? { ...f, name, description: desc, color } : f))
    );
  };

  return (
    <div className="mt-16 sm:mt-0 px-4 relative">
      <h1 className="text-2xl font-bold mb-4">お気に入り記事</h1>

      {/* 編集モードボタン */}
      <button
        onClick={() => setEditMode(!editMode)}
        className="absolute top-4 right-12 text-gray-400 dark:text-gray-300"
      >
        <Edit3 size={20} />
      </button>

      {/* フォルダー追加ボタン */}
      <button
        onClick={handleAddFolder}
        className="absolute top-4 right-4 text-gray-400 dark:text-gray-300"
      >
        <FolderPlus size={20} />
      </button>

      {/* フォルダー表示 */}
      {folders.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {folders.map((folder) => (
            <FolderCard
              key={folder.id}
              id={folder.id}
              name={folder.name}
              description={folder.description}
              color={folder.color}
              onUpdate={handleUpdateFolder}
            />
          ))}
        </div>
      )}

      {/* お気に入り記事表示 */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
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
