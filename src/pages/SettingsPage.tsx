import ActionSettingsSection from './ActionSettingsSection';

export default function SettingsPage() {
  return (
    <div className="mt-20 px-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">設定</h1>

      {/* 他にも設定セクションがあればここに増やせる */}
      <ActionSettingsSection />
    </div>
  );
}

  