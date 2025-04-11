//src/components/FolderCard.tsx
//ここからコード
import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";

interface FolderCardProps {
  title: string;
  description: string;
  color: string;
  onUpdate: (data: { title: string; description: string; color: string }) => void;
}

const colors = [
  { name: "red", hex: "#ef4444" },
  { name: "blue", hex: "#3b82f6" },
  { name: "yellow", hex: "#f59e0b" },
];

export default function FolderCard({ title, description, color, onUpdate }: FolderCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);
  const [tempDescription, setTempDescription] = useState(description);
  const [tempColor, setTempColor] = useState(color);

  const handleSave = () => {
    onUpdate({
      title: tempTitle,
      description: tempDescription,
      color: tempColor,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempTitle(title);
    setTempDescription(description);
    setTempColor(color);
    setIsEditing(false);
  };

  return (
    <div
      className={`relative w-[280px] p-4 rounded-xl shadow-md ${
        isEditing ? "border" : ""
      }`}
      style={{ borderLeft: `8px solid ${colors.find(c => c.name === color)?.hex || "#000"}` }}
    >
      {/* 編集ボタン or チェック・キャンセル */}
      <div className="absolute top-2 right-2 flex gap-2">
        {isEditing ? (
          <>
            <X className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" onClick={handleCancel} />
            <Check className="w-5 h-5 text-gray-400 hover:text-green-500 cursor-pointer" onClick={handleSave} />
          </>
        ) : (
          <Pencil className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setIsEditing(true)} />
        )}
      </div>

      {/* 内容 */}
      {isEditing ? (
        <div className="space-y-2 mt-4">
          <input
            type="text"
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            placeholder="フォルダー名"
            className="w-full p-2 rounded border"
          />
          <textarea
            value={tempDescription}
            onChange={(e) => setTempDescription(e.target.value)}
            placeholder="説明を追加"
            className="w-full p-2 rounded border"
          />
          <div className="flex gap-3 mt-2">
            {colors.map((c) => (
              <div
                key={c.name}
                className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                  tempColor === c.name ? "border-black" : "border-transparent"
                }`}
                style={{ backgroundColor: c.hex }}
                onClick={() => setTempColor(c.name)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{description}</div>
        </div>
      )}
    </div>
  );
}

//ここまでコード