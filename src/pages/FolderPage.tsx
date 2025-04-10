import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ArrowLeft } from 'lucide-react';

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

export default function FolderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const folderId = Number(id);

  const [folders, setFolders] = useState<FolderItem[]>([]);

  useEffect(() => {
    const saved = Cookies.get('folders');
    if (saved) {
      setFolders(JSON.parse(saved));
    }
  }, []);

  const folder = folders.find((f) => f.id === folderId);
  const articles = dummyArticles.filter((a) => folder?.items?.includes(a.id));

  if (!folder) {
    return <div className="p-4 text-red-500">フォルダーが見つかりませんでした。</div>;
  }

  return (
    <div className="mt-16 sm:mt-0 px-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="mr-1 w-4 h-4" /> 戻る
      </button>

      <h1 className="text-2xl font-bold mb-1">{folder.title}</h1>
      <p className="text-gray-600 mb-4">{folder.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md"
          >
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
