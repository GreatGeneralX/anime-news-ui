export default function SettingsPage() {
    return (
      <div className="mt-16 px-4">
        <h1 className="text-2xl font-bold mb-4">設定</h1>
  
        <section>
          <h2 className="text-lg font-semibold mb-2">アクション設定</h2>
          <p className="text-gray-500 mb-4">以下のUX演出を個別に切り替えできます。</p>
  
          <ul className="space-y-3">
            <li>🧱 ブロック崩れ：未実装</li>
            <li>🛸 吸い込みメニュー：未実装</li>
            <li>🎈 ハート浮上：未実装</li>
          </ul>
        </section>
      </div>
    );
  }
  