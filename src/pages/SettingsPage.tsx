import ActionSettingsSection from './ActionSettingsSection';

export default function SettingsPage() {
  return (
    <div className="mt-2 sm:mt-4 px-6">
      <h1 className="text-2xl font-bold mb-4">設定</h1>

      {/* グレーの仕切り線（ライト＆ダーク対応） */}
      <hr className="border-t border-gray-300 dark:border-zinc-700 mb-4" />

      <ActionSettingsSection />
    </div>
  );
}
