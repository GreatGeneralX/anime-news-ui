import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';


export default function Layout() {
    return (
      <div>
        {/* サイドバーやヘッダー */}
        <Sidebar />
  
        {/* 各ページの中身がここに差し込まれる */}
        <main>
          <Outlet /> ← ここにHomePageやFavoritesPageが出てくる
        </main>
      </div>
    );
  }
  