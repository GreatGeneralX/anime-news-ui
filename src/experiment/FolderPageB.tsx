// src/experiment/FolderPageB.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChevronLeft, FolderOpen } from 'lucide-react';
import { useDrop } from 'react-dnd';
import { useFolders } from '../stores/useFolders';
import { useBookmarks } from '../stores/useBookmarks';
import DraggableArticle from '../components/DraggableArticle';

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

export default function FolderPageB() {
  const { id } = useParams();
  const navigate = useNavigate();
  const folderId = Number(id);
  const { folders, updateFolder } = useFolders();
  const { add } = useBookmarks();

  const folder = folders.find((f) => f.id === folderId);
  const [deleteMode, setDeleteMode] = useState(false);

  if (!folder || !Array.isArray(folder.items)) {
    return (
      <div className="p-4 text-gray-500">
        フォルダーが見つかりませんでした。
        <button
          onClick={() => navigate('/favorites')}
          className="ml-2 underline text-blue-500"
        >
          お気に入りへ戻る
        </button>
      </div>
    );
  }

  const articles = dummyArticles.filter((a) => folder.items!.includes(a.id));

  const handleRemoveFromFolder = (articleId: number) => {
    const updatedItems = folder.items!.filter((id) => id !== articleId);
    updateFolder(folder.id, { items: updatedItems });

    const articleToRestore = dummyArticles.find((a) => a.id === articleId);
    if (articleToRestore) {
      const bookmarks = useBookmarks.getState().bookmarks;
      const alreadyExists = bookmarks.some((b) => b.id === articleToRestore.id);
      if (!alreadyExists) {
        add(articleToRestore);
      }
    }

    // B -> A に切り替え
    navigate(`/experiment/folder/${folderId}/a`, { replace: true });
  };

  const [{ isOver }, dropToExitRef] = useDrop(() => ({
    accept: 'ARTICLE',
    drop: (item: { id: number }) => {
      handleRemoveFromFolder(item.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="mt-16 sm:mt-0 px-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-black dark:text-white sm:text-base"
      >
        <ChevronLeft size={24} />
      </button>

      <h1 className="text-2xl font-bold mb-1">[B] {folder.title || '未命名フォルダー'}</h1>
      <p className="text-gray-600 mb-4">{folder.description || 'フォルダーの説明がありません。'}</p>

      {articles.length === 0 ? (
        <div className="text-gray-400">このフォルダーにはまだ記事がありません。</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <DraggableArticle key={article.id} article={article} />
          ))}
        </div>
      )}

      <div
        className={
          `fixed bottom-6 left-1/2 sm:left-[calc(50%+7rem)] transform -translate-x-1/2 z-50 transition-all duration-300 ${isOver ? 'scale-110 bg-gray-200 dark:bg-zinc-700' : ''}`
        }
      >
        <div
          ref={(node) => {
            if (node) dropToExitRef(node);
          }}
          className="w-16 h-16 rounded-full bg-white dark:bg-zinc-800 shadow-md flex items-center justify-center border border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
        >
          <FolderOpen size={32} className="text-gray-700 dark:text-white" />
        </div>
      </div>
    </div>
  );
}