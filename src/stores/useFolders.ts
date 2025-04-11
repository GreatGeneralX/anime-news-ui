// useFolders.ts
import { create } from 'zustand';
import Cookies from 'js-cookie';
import type { FolderItem } from '../types';

const saved = Cookies.get('folders');
const initialFolders: FolderItem[] = saved ? JSON.parse(saved) : [];

interface FolderStore {
  folders: FolderItem[];
  addFolder: (folder: FolderItem) => void;
  updateFolder: (id: number, data: Partial<FolderItem>) => void;
  removeFolder: (id: number) => void;
}

export const useFolders = create<FolderStore>((set, get) => ({
  folders: initialFolders,

  addFolder: (folder) => {
    const updated = [...get().folders, folder];
    Cookies.set('folders', JSON.stringify(updated), { expires: 365 });
    set({ folders: updated });
  },

  updateFolder: (id, data) => {
    const updated = get().folders.map((f) =>
      f.id === id ? { ...f, ...data } : f
    );
    Cookies.set('folders', JSON.stringify(updated), { expires: 365 });
    set({ folders: updated });
  },

  removeFolder: (id) => {
    const updated = get().folders.filter((f) => f.id !== id);
    Cookies.set('folders', JSON.stringify(updated), { expires: 365 });
    set({ folders: updated });
  },
}));
