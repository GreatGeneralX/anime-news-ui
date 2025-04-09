import { useEffect, useState } from 'react';

interface ActionToggleProps {
  label: string;
  storageKey: string;
  defaultValue?: boolean;
}

function ActionToggle({ label, storageKey, defaultValue = true }: ActionToggleProps) {
  const [enabled, setEnabled] = useState<boolean>(() => {
    const stored = localStorage.getItem(storageKey);
    return stored !== null ? stored === 'true' : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, String(enabled));
  }, [enabled, storageKey]);

  return (
    <label className="flex items-center justify-between mb-4">
      <span className="text-sm font-medium">{label}</span>
      <input
        type="checkbox"
        checked={enabled}
        onChange={() => setEnabled(!enabled)}
        className="w-5 h-5 text-blue-600 rounded focus:ring-0"
      />
    </label>
  );
}

export default function ActionSettings() {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold mb-2">アクション設定</h2>
      <p className="text-sm text-gray-500 mb-4">
        UIに遊び心を加えるアクション演出を切り替えることができます。
      </p>
      <div className="space-y-2">
        <ActionToggle label="ハート風船エフェクト" storageKey="action_heartBalloon" />
        {/* 他のアクションもここに追加予定 */}
      </div>
    </section>
  );
}