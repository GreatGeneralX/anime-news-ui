import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  Check,
  X,
  Folder,
  FolderPlus,
  Trash2,
  Trash,
  Edit3,
} from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
  items?: number[];
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
  const navigate = useNavigate();

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
      prev.map((f) => (f.id === id ? { ...f, title, description, isEditing: false } : f))
    );
  };

  const handleCancelEdit = (id: number) => {
    setFolders((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isEditing: false } : f))
    );
  };

  const handleStartEdit = (id: number) => {
    setFolders((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isEditing: true } : f))
    );
  };

  const handleAddFolder = () => {
    const newId = Date.now();
    setFolders((prev) => [
      ...prev,
      {
        id: newId,
        title: '',
        description: '',
        color: '#9ca3af',
        isEditing: true,
        items: [],
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

  const ArticleCard = ({ article }: { article: Article }) => {
    const [, dragRef] = useDrag(() => ({
      type: 'ARTICLE',
      item: { id: article.id },
    }));

    return (
      <div
        ref={(node) => {
          if (node) dragRef(node);
        }}
        className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md relative"
      >
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
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
          {article.summary}
        </p>
      </div>
    );
  };

  const FolderCard = ({ folder }: { folder: FolderItem }) => {
    const [tempTitle, setTempTitle] = useState(folder.title);
    const [tempDescription, setTempDescription] = useState(folder.description);

    const [{ isOver }, dropRef] = useDrop(() => ({
      accept: 'ARTICLE',
      drop: (item: { id: number }) => {
        if (!folder.items?.includes(item.id)) {
          setFolders((prev) =>
            prev.map((f) =>
              f.id === folder.id
                ? { ...f, items: [...(f.items || []), item.id] }
                : f
            )
          );
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));

    return (
      <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md relative">
        {folder.isEditing ? (
          <>
            <div className="absolute top-2 right-2 flex gap-1 z-10">
              <button
                onClick={() => handleCancelEdit(folder.id)}
                className="text-gray-400 hover:text-red-400"
              >
                <X size={18} />
              </button>
              <button
                onClick={() => handleUpdateFolder(folder.id, tempTitle, tempDescription)}
                className="text-green-500 hover:text-green-600"
              >
                <Check size={18} />
              </button>
            </div>
            <div
              ref={(node) => {
                if (node) dropRef(node);
              }}
              onClick={() => navigate(`/favorites/folder/${folder.id}`)}
              className="cursor-pointer"
            >
              <Folder
                className="w-full h-[160px] mb-2"
                style={{ color: folder.color }}
              />
            </div>

            <input
              type="text"
              placeholder="フォルダー名"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              className="w-full mb-1 p-2 rounded-md border"
            />
            <textarea
              placeholder="説明を追加"
              value={tempDescription}
              onChange={(e) => setTempDescription(e.target.value)}
              className="w-full p-2 rounded-md border"
            />
            <div className="flex gap-2 mt-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  onClick={() =>
                    setFolders((prev) =>
                      prev.map((f) =>
                        f.id === folder.id ? { ...f, color } : f
                      )
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
            <div ref={(node) => { if (node) dropRef(node); }} onClick={() => navigate(`/favorites/folder/${folder.id}`)} className="cursor-pointer">
              <Folder
                className="w-full h-[160px] mb-2"
                style={{ color: folder.color ?? '#9ca3af' }}
              />
            </div>
            <div className="absolute top-2 right-2 flex gap-1 z-10">
              {deleteMode ? (
                <button
                  onClick={() => handleDeleteFolder(folder.id)}
                  className="text-red-400 hover:text-red-600"
                >
                  <X size={18} />
                </button>
              ) : (
                <button
                  onClick={() => handleStartEdit(folder.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Edit3 size={18} />
                </button>
              )}
            </div>
            <h2 className="font-bold mb-1">{folder.title || '新しいフォルダー'}</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {folder.description || 'ここにフォルダーの説明が入ります。'}
            </p>
            {folder.items && folder.items.length > 0 && (
              <div className="text-xs text-gray-500 mt-1">記事: {folder.items.length} 件</div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mt-16 sm:mt-0 px-4 relative">
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
          {folders.map((folder) => (
            <FolderCard key={folder.id} folder={folder} />
          ))}
          {bookmarked.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}