import { create } from "zustand";

interface LoaderState {
  isLoading: boolean;
  setIsLoading: (newIsLoading: boolean) => void;
}

const useLoaderStore = create<LoaderState>((set) => ({
  isLoading: false,
  setIsLoading: (newIsLoading) => set({ isLoading: newIsLoading }),
}));

export { useLoaderStore };
