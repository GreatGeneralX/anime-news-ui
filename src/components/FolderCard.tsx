import { useState } from 'react';
import { Edit3, Save } from 'lucide-react';

interface FolderCardProps {
  id: number;
  name: string;
  description: string;
  color: string;
  onUpdate: (id: number, name: string, description: string, color: string) => void;
}

export default function FolderCard({ id, name, description, color, onUpdate }: FolderCardProps) {
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newDesc, setNewDesc] = useState(description);
  const [newColor, setNewColor] = useState(color);

  const handleSave = () => {
    onUpdate(id, newName, newDesc, newColor);
    setEditMode(false);
  };

  return (
    <div className={`bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md relative border-l-4 border-${color}`}>
      {editMode ? (
        <div className="space-y-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full px-2 py-1 border rounded text-black dark:text-white"
            placeholder="フォルダー名"
          />
          <textarea
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="w-full px-2 py-1 border rounded text-black dark:text-white"
            placeholder="説明"
          />
          <select
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className="w-full px-2 py-1 border rounded text-black dark:text-white"
          >
            <option value="gundam-red">赤（ガンダム）</option>
            <option value="gundam-blue">青（ガンダム）</option>
            <option value="gundam-yellow">黄（ガンダム）</option>
          </select>
          <button onClick={handleSave} className="absolute top-2 right-2 text-green-500">
            <Save size={20} />
          </button>
        </div>
      ) : (
        <div>
          <h2 className="font-bold text-lg mb-1">{newName}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">{newDesc}</p>
          <button onClick={() => setEditMode(true)} className="absolute top-2 right-2 text-gray-400 dark:text-gray-300">
            <Edit3 size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
