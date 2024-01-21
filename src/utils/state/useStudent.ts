import { create } from "zustand";

const useStudentStore = create((set) => ({
  student: [],
  setStudent: (data: unknown) => set({ student: data }),
}));

export { useStudentStore };
