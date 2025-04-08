import { useLocation } from 'react-router-dom';

export default function DebugLocation() {
  const location = useLocation();
  const state = location.state as any;

  return (
    <div
      className="fixed bottom-0 left-0 bg-black text-white text-xs p-2 z-[99999] opacity-80"
      style={{ fontFamily: 'monospace' }}
    >
      <div>📍 pathname: <strong>{location.pathname}</strong></div>
      <div>🧠 backgroundLocation: {state?.backgroundLocation?.pathname || 'none'}</div>
    </div>
  );
}
