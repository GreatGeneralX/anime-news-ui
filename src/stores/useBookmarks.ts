//src/stores/useBookmarks.ts
//ここからコード
import { create } from 'zustand';
import Cookies from 'js-cookie';
import type { Article } from '../types';

interface BookmarkStore {
  bookmarks: Article[];
  add: (article: Article) => void;
  remove: (id: number) => void;
  initialize: (initial: Article[]) => void;
}

const saved = Cookies.get('bookmarks');
const dummyArticles: Article[] = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  category: ['すべて', 'アニメ', 'グッズ', 'ゲーム', 'Vtuber', 'コスプレ'][(i + 1) % 6],
  title: `ダミー記事タイトル ${i + 1}`,
  date: '2025-04-06',
  summary: 'これはダミー記事の要約です。',
  thumbnail: `https://placehold.co/600x400?text=Article${i + 1}`,
}));

export const useBookmarks = create<BookmarkStore>((set) => ({
  bookmarks: saved
    ? dummyArticles.filter((a) => new Set(JSON.parse(saved)).has(a.id))
    : [],

    add: (article) => {
        set((state) => {
          const updated = [...state.bookmarks, article];
          Cookies.set('bookmarks', JSON.stringify(updated.map((a) => a.id)), { expires: 365 });
          return { bookmarks: updated };
        });
      },
      

  remove: (id) =>
    set((state) => {
      const updated = state.bookmarks.filter((a) => a.id !== id);
      Cookies.set('bookmarks', JSON.stringify(updated.map((a) => a.id)), {
        expires: 365,
      });
      return { bookmarks: updated };
    }),

  initialize: (initial) =>
    set(() => {
      Cookies.set('bookmarks', JSON.stringify(initial.map((a) => a.id)), {
        expires: 365,
      });
      return { bookmarks: initial };
    }),
}));
//ここまでコード