import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex bg-white text-black dark:bg-zinc-900 dark:text-white h-screen">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}
