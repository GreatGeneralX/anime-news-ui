import { useActionSettings } from '../stores/useActionSettings';

export default function ActionSettingsPage() {
  const settings = useActionSettings();

  return (
    <div className="mt-20 px-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">アクション設定</h1>

      <div className="flex items-center justify-between bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
        <span className="text-sm font-medium">🧭 サイドバーのホバー演出</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={settings.sidebarHoverEffect}
            onChange={() => settings.toggle('sidebarHoverEffect')}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-zinc-600 rounded-full peer dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-500"></div>
        </label>
      </div>
    </div>
  );
}
