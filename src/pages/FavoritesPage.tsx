import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Edit3, FolderPlus, Folder } from 'lucide-react';

interface Article {
  id: number;
  category: string;
  title: string;
  date: string;
  summary: string;
  thumbnail: string;
}

interface FolderItem {
  id: number;
  title: string;
  description: string;
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
  const [folders, setFolders] = useState<FolderItem[]>([]);
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
    const newFolder: FolderItem = {
      id: newId,
      title: `新しいフォルダー ${newId}`,
      description: 'ここにフォルダーの説明が入ります。',
    };
    setFolders((prev) => [...prev, newFolder]);
  };

  return (
    <div className="mt-16 sm:mt-0 px-4 relative">
      {/* 編集・フォルダー作成ボタン */}
      <button
        onClick={() => setEditMode(!editMode)}
        className="absolute top-4 right-12 z-10 text-gray-400 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
      >
        <Edit3 size={20} />
      </button>

      <button
        onClick={handleAddFolder}
        className="absolute top-4 right-4 z-10 text-gray-400 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
      >
        <FolderPlus size={22} />
      </button>

      <h1 className="text-2xl font-bold mb-4">お気に入り記事</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {folders.map((folder) => (
          <div
            key={`folder-${folder.id}`}
            className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md flex flex-col items-start"
          >
            <Folder className="w-full h-[160px] text-gray-400 mb-2" />
            <h2 className="font-bold mb-1">{folder.title}</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{folder.description}</p>
          </div>
        ))}

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
