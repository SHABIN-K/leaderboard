import { create } from "zustand";

const useLoader = create((set) => ({
  isLoading: false,
  setIsLoading: (newIsLoading: boolean) => set({ isLoading: newIsLoading }),
}));

export { useLoader };
