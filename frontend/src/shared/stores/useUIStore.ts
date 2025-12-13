import { create } from 'zustand';
import { Task } from '@/features/tasks/types'; // تأكد من استيراد النوع

interface UIState {
  // Task Form Modal
  isTaskModalOpen: boolean;
  openTaskModal: () => void;
  closeTaskModal: () => void;

  // Task Completion Modal (NEW)
  taskToComplete: Task | null;
  setTaskToComplete: (task: Task | null) => void;

  // Sidebar
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  isSidebarCollapsed: boolean;
  toggleSidebarCollapsed: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isTaskModalOpen: false,
  openTaskModal: () => set({ isTaskModalOpen: true }),
  closeTaskModal: () => set({ isTaskModalOpen: false }),

  // Completion Logic
  taskToComplete: null,
  setTaskToComplete: (task) => set({ taskToComplete: task }),

  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),

  isSidebarCollapsed: false,
  toggleSidebarCollapsed: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));