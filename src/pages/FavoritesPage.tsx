import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Edit3, Check, X, Folder } from 'lucide-react';

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
  isEditing?: boolean;
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
  const [folders, setFolders] = useState<FolderItem[]>([
    {
      id: 1,
      title: '',
      description: '',
      isEditing: true,
    },
  ]);

  useEffect(() => {
    const saved = Cookies.get('bookmarks');
    if (saved) {
      const ids = new Set(JSON.parse(saved));
      const filtered = dummyArticles.filter((a) => ids.has(a.id));
      setBookmarked(filtered);
    }
  }, []);

  const handleUpdateFolder = (id: number, title: string, description: string) => {
    setFolders((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, title, description, isEditing: false } : f
      )
    );
  };

  const handleCancelEdit = (id: number) => {
    setFolders((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, isEditing: false } : f
      )
    );
  };

  const handleStartEdit = (id: number) => {
    setFolders((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, isEditing: true } : f
      )
    );
  };

  return (
    <div className="mt-16 sm:mt-0 px-4 relative">
      <h1 className="text-2xl font-bold mb-4">お気に入り記事</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {folders.map((folder) => (
          <div
            key={`folder-${folder.id}`}
            className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md relative"
          >
            {folder.isEditing ? (
              <>
                <div className="absolute top-2 right-2 flex gap-1 z-10">
                  <button
                    onClick={() =>
                      handleCancelEdit(folder.id)
                    }
                    className="text-gray-400 hover:text-red-400"
                  >
                    <X size={18} />
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateFolder(
                        folder.id,
                        folder.title,
                        folder.description
                      )
                    }
                    className="text-green-500 hover:text-green-600"
                  >
                    <Check size={18} />
                  </button>
                </div>
                <Folder className="w-full h-[160px] text-gray-400 mb-2" />
                <input
                  type="text"
                  placeholder="フォルダー名"
                  value={folder.title}
                  onChange={(e) =>
                    setFolders((prev) =>
                      prev.map((f) =>
                        f.id === folder.id
                          ? { ...f, title: e.target.value }
                          : f
                      )
                    )
                  }
                  className="w-full mb-1 p-2 rounded-md border bg-white dark:bg-zinc-900 text-black dark:text-white placeholder-opacity-50 placeholder-gray-500"
                />
                <textarea
                  placeholder="説明を追加"
                  value={folder.description}
                  onChange={(e) =>
                    setFolders((prev) =>
                      prev.map((f) =>
                        f.id === folder.id
                          ? { ...f, description: e.target.value }
                          : f
                      )
                    )
                  }
                  className="w-full p-2 rounded-md border bg-white dark:bg-zinc-900 text-black dark:text-white placeholder-opacity-50 placeholder-gray-500"
                />
              </>
            ) : (
              <>
                <Folder className="w-full h-[160px] text-gray-400 mb-2" />
                <button
                  onClick={() => handleStartEdit(folder.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                  <Edit3 size={18} />
                </button>
                <h2 className="font-bold mb-1">
                  {folder.title || '新しいフォルダー'}
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {folder.description || 'ここにフォルダーの説明が入ります。'}
                </p>
              </>
            )}
          </div>
        ))}

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
