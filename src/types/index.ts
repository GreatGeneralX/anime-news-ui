// src/types/index.ts

export interface FolderItem {
    id: number;
    title: string;
    description: string;
    color?: string;
    isEditing?: boolean;
    items?: number[];
  }
  
  export interface Article {
    id: number;
    category: string;
    title: string;
    date: string;
    summary: string;
    thumbnail: string;
  }
   