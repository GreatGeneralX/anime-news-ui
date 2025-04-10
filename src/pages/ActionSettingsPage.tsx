import { useActionSettings } from '../stores/useActionSettings';

const toggleItems = [
  { key: 'sidebarHoverEffect', label: 'サイドバーのホバー演出' },
  { key: 'hamburgerBounce', label: 'ハンバーガーのポヨン演出' },
  { key: 'dragParticleEffect', label: '記事ドロップ時のパーティクル演出' },
  { key: 'folderOpenEffect', label: 'フォルダー展開時のページ割れ演出' },
  { key: 'filterJumpEffect', label: '検索時のぴょん演出' },
  { key: 'fullStatePersistence', label: '状態の永続保存（フォルダ・記事）' },
] as const;

export default function ActionSettingsPage() {
  const settings = useActionSettings(); // Zustandの状態を使う

  return (
    <div className="mt-20 px-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">アクション設定</h1>

      <div className="space-y-4">
        {toggleItems.map((item) => (
          <div key={item.key} className="flex items-center justify-between bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
            <span className="text-sm font-medium">{item.label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings[item.key]}
                onChange={() => settings.toggle(item.key)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-zinc-600 rounded-full peer dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-500"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
