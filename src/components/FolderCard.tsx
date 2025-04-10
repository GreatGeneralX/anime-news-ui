import { useState } from 'react';
import { Edit3, Check, X } from 'lucide-react';

interface FolderCardProps {
  id: number;
  name: string;
  description: string;
  color: string;
  onUpdate: (id: number, name: string, description: string, color: string) => void;
}

const colorOptions = [
  { label: 'gundam-red', color: '#e63946' },
  { label: 'gundam-blue', color: '#457b9d' },
  { label: 'gundam-yellow', color: '#f4a261' },
];

export default function FolderCard({ id, name, description, color, onUpdate }: FolderCardProps) {
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newDesc, setNewDesc] = useState(description);
  const [newColor, setNewColor] = useState(color);

  const handleSave = () => {
    onUpdate(id, newName, newDesc, newColor);
    setEditMode(false);
  };

  const handleCancel = () => {
    setNewName(name);
    setNewDesc(description);
    setNewColor(color);
    setEditMode(false);
  };

  return (
    <div
      className={`bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md relative border-l-4`}
      style={{ borderColor: colorOptions.find((c) => c.label === newColor)?.color || '#ccc' }}
    >
      {editMode ? (
        <>
          {/* 保存・キャンセルボタン */}
          <div className="absolute top-1 right-2 flex gap-1 z-10">
            <button onClick={handleCancel} className="text-gray-400 hover:text-red-400">
              <X size={18} />
            </button>
            <button onClick={handleSave} className="text-green-500 hover:text-green-600">
              <Check size={18} />
            </button>
          </div>

          <div className="space-y-3 pt-6">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="フォルダー名"
              className="w-full px-2 py-1 border rounded text-black dark:text-white placeholder:text-gray-500 placeholder-opacity-50"
            />
            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="説明を追加"
              className="w-full px-2 py-1 border rounded text-black dark:text-white placeholder:text-gray-500 placeholder-opacity-50"
            />
            <div className="flex gap-2">
              {colorOptions.map((c) => (
                <button
                  key={c.label}
                  onClick={() => setNewColor(c.label)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    newColor === c.label ? 'border-black dark:border-white' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c.color }}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>
          <h2 className="font-bold text-lg mb-1">{name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
          <button
            onClick={() => setEditMode(true)}
            className="absolute top-2 right-2 text-gray-400 dark:text-gray-300"
          >
            <Edit3 size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
