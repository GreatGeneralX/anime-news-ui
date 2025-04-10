import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {
  Check,
  X,
  Folder,
  FolderPlus,
  Trash2,
  Trash,
} from 'lucide-react';

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
  color?: string;
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

const colorOptions = ['#9ca3af', '#ef4444', '#10b981', '#3b82f6', '#facc15'];

export default function FavoritesPage() {
  const [bookmarked, setBookmarked] = useState<Article[]>([]);
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [deleteMode, setDeleteMode] = useState(false);

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
      prev.map((f) => (f.id === id ? { ...f, isEditing: false } : f))
    );
  };

  const handleAddFolder = () => {
    const newId = folders.length + 1;
    setFolders((prev) => [
      ...prev,
      {
        id: newId,
        title: '',
        description: '',
        color: '#9ca3af',
        isEditing: true,
      },
    ]);
  };

  const toggleDeleteMode = () => setDeleteMode((prev) => !prev);

  const handleDeleteFolder = (id: number) => {
    if (confirm('本当にこのフォルダーを削除しますか？')) {
      setFolders((prev) => prev.filter((f) => f.id !== id));
    }
  };

  const handleRemoveBookmark = (id: number) => {
    if (confirm('この記事をお気に入りから削除しますか？')) {
      const updated = bookmarked.filter((a) => a.id !== id);
      setBookmarked(updated);
      Cookies.set('bookmarks', JSON.stringify(updated.map((a) => a.id)), {
        expires: 365,
      });
    }
  };

  return (
    <div className="mt-16 sm:mt-0 px-4 relative">
      {/* 編集・追加ボタン */}
      <div className="absolute top-4 right-4 flex gap-4 z-20">
        <button onClick={toggleDeleteMode}>
          {deleteMode ? (
            <Trash className="w-5 h-5 text-red-500 hover:text-red-600 transition-colors duration-300" />
          ) : (
            <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-600 transition-colors duration-300" />
          )}
        </button>
        <button onClick={handleAddFolder}>
          <FolderPlus className="w-5 h-5 text-gray-400 hover:text-gray-600" />
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">お気に入り記事</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* フォルダー表示 */}
        {folders.map((folder) => (
          <div
            key={`folder-${folder.id}`}
            className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md relative"
          >
            {folder.isEditing ? (
              <>
                <div className="absolute top-2 right-2 flex gap-1 z-10">
                  <button onClick={() => handleCancelEdit(folder.id)} className="text-gray-400 hover:text-red-400">
                    <X size={18} />
                  </button>
                  <button
                    onClick={() => handleUpdateFolder(folder.id, folder.title, folder.description)}
                    className="text-green-500 hover:text-green-600"
                  >
                    <Check size={18} />
                  </button>
                </div>
                <Folder className="w-full h-[160px] mb-2" style={{ color: folder.color }} />
                <input
                  type="text"
                  placeholder="フォルダー名"
                  value={folder.title}
                  onChange={(e) =>
                    setFolders((prev) =>
                      prev.map((f) => (f.id === folder.id ? { ...f, title: e.target.value } : f))
                    )
                  }
                  className="w-full mb-1 p-2 rounded-md border bg-white dark:bg-zinc-900 text-black dark:text-white"
                />
                <textarea
                  placeholder="説明を追加"
                  value={folder.description}
                  onChange={(e) =>
                    setFolders((prev) =>
                      prev.map((f) => (f.id === folder.id ? { ...f, description: e.target.value } : f))
                    )
                  }
                  className="w-full p-2 rounded-md border bg-white dark:bg-zinc-900 text-black dark:text-white"
                />
                <div className="flex gap-2 mt-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() =>
                        setFolders((prev) =>
                          prev.map((f) => (f.id === folder.id ? { ...f, color } : f))
                        )
                      }
                      className="w-5 h-5 rounded-full border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <Folder className="w-full h-[160px] mb-2" style={{ color: folder.color ?? '#9ca3af' }} />
                {deleteMode && (
                  <button
                    onClick={() => handleDeleteFolder(folder.id)}
                    className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                  >
                    <X size={18} />
                  </button>
                )}
                <h2 className="font-bold mb-1">{folder.title || '新しいフォルダー'}</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {folder.description || 'ここにフォルダーの説明が入ります。'}
                </p>
              </>
            )}
          </div>
        ))}

        {/* 記事表示 */}
        {bookmarked.map((article) => (
          <div key={article.id} className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md relative">
            {deleteMode && (
              <button
                onClick={() => handleRemoveBookmark(article.id)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600 z-10"
              >
                <X size={18} />
              </button>
            )}
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
