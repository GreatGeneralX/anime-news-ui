import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // これは自作のSidebarね！

export default function Layout() {
  return (
    <div className="flex bg-white text-black dark:bg-zinc-900 dark:text-white h-screen overflow-hidden">
      <Sidebar />
      <main className="ml-0 sm:ml-56 h-full overflow-y-auto px-6 py-6 w-full max-w-screen-xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

  