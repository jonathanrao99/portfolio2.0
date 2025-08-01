import { create } from 'zustand';

interface ContactModalState {
  isModalOpen: boolean;
  toggleModal: () => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useContactModalStore = create<ContactModalState>((set) => ({
  isModalOpen: false,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
})); 