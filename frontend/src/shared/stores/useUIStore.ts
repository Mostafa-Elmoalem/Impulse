import { create } from 'zustand';

interface UIState {
  // Task Modal State
  isTaskModalOpen: boolean;
  openTaskModal: () => void;
  closeTaskModal: () => void;

  // Global Search State
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isTaskModalOpen: false,
  openTaskModal: () => set({ isTaskModalOpen: true }),
  closeTaskModal: () => set({ isTaskModalOpen: false }),
  
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));