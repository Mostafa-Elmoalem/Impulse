import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar/Sidebar';

export const AppLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 transition-all duration-300 ml-[280px]">
        <Outlet />
      </main>
    </div>
  );
};