import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';

export function RootLayout() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-blue-950">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
