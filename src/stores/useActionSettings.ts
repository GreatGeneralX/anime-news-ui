import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ActionSettings {
  sidebarHoverEffect: boolean;
  hamburgerBounce: boolean;
  dragParticleEffect: boolean;
  folderOpenEffect: boolean;
  filterJumpEffect: boolean;
  fullStatePersistence: boolean;
  toggle: (key: keyof Omit<ActionSettings, 'toggle'>) => void;
}

export const useActionSettings = create<ActionSettings>()(
  persist(
    (set) => ({
      sidebarHoverEffect: true,
      hamburgerBounce: true,
      dragParticleEffect: true,
      folderOpenEffect: true,
      filterJumpEffect: true,
      fullStatePersistence: true,
      toggle: (key) =>
        set((state) => ({
          ...state,
          [key]: !state[key],
        })),
    }),
    {
      name: 'action-settings', // localStorageに保存されるキー名
    }
  )
);
