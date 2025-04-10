import ActionSettingsSection from './ActionSettingsSection';

export default function SettingsPage() {
  return (
    <div className="mt-16 sm:mt-0 px-4">
      <h1 className="text-2xl font-bold mb-6">設定</h1>

      {/* 他にも設定セクションがあればここに増やせる */}
      <ActionSettingsSection />
    </div>
  );
}

  