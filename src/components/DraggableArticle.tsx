//src/components/DraggableArticle.tsx
//ここからコード
import { useDrag } from 'react-dnd';

interface DraggableArticleProps {
  article: {
    id: number;
    title: string;
    date: string;
    summary: string;
    thumbnail: string;
  };
}

export default function DraggableArticle({ article }: DraggableArticleProps) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'ARTICLE',
    item: { id: article.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={(node) => {
        if (node) dragRef(node);
      }}
      className={`relative bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <img src={article.thumbnail} className="w-full rounded-md mb-2" />
      <h2 className="font-bold mb-1">{article.title}</h2>
      <p className="text-xs text-gray-500 mb-1">{article.date}</p>
      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
        {article.summary}
      </p>
    </div>
  );
}
//ここまでコード