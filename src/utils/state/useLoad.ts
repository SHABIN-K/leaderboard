import { create } from "zustand";

const useLoaderStore = create((set) => ({
  isLoading: false,
  setIsLoading: (newIsLoading: boolean) => set({ isLoading: newIsLoading }),
}));

export { useLoaderStore };
