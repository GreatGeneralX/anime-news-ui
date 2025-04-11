// src/pages/ParallelFolderRouter.tsx
import { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export default function ParallelFolderRouter() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const view = new URLSearchParams(location.search).get('view');

    // a/b が指定されてなければランダムで振り分け
    const next = view === 'a' ? 'b' : view === 'b' ? 'a' : Math.random() < 0.5 ? 'a' : 'b';

    navigate(`/favorites/folder/${id}/${next}`, { replace: true });
  }, [navigate, id, location.search]);

  return null;
}
//ここまでコード