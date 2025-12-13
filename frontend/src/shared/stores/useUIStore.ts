import { create } from 'zustand';

interface UIState {
  // Task Modal
  isTaskModalOpen: boolean;
  openTaskModal: () => void;
  closeTaskModal: () => void;

  // Sidebar (New)
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isTaskModalOpen: false,
  openTaskModal: () => set({ isTaskModalOpen: true }),
  closeTaskModal: () => set({ isTaskModalOpen: false }),

  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
  
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));