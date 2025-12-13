import { create } from 'zustand';

interface UIState {
  // Task Modal
  isTaskModalOpen: boolean;
  openTaskModal: () => void;
  closeTaskModal: () => void;

  // Sidebar (Mobile Visibility)
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;

  // Sidebar (Desktop Collapse State)
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

  // Mobile Menu Logic
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),

  // Desktop Collapse Logic (Default is NOT collapsed)
  isSidebarCollapsed: false,
  toggleSidebarCollapsed: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));