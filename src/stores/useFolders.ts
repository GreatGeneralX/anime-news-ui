// src/stores/useFolders.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FolderItem {
  id: number;
  title: string;
  description: string;
  color?: string;
  isEditing?: boolean;
  items?: number[];
}

interface FolderState {
  folders: FolderItem[];
  setFolders: (folders: FolderItem[]) => void;
  updateFolder: (id: number, update: Partial<FolderItem>) => void;
  addFolder: (folder: FolderItem) => void;
  removeFolder: (id: number) => void;
}

export const useFolders = create<FolderState>()(
  persist(
    (set) => ({
      folders: [],
      setFolders: (folders) => set({ folders }),
      updateFolder: (id, update) =>
        set((state) => ({
          folders: state.folders.map((f) =>
            f.id === id ? { ...f, ...update } : f
          ),
        })),
      addFolder: (folder) =>
        set((state) => ({
          folders: [...state.folders, folder],
        })),
      removeFolder: (id) =>
        set((state) => ({
          folders: state.folders.filter((f) => f.id !== id),
        })),
    }),
    {
      name: 'folders-storage', // localStorageのキー
    }
  )
);
