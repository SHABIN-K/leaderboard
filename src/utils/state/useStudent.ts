import { create } from "zustand";
import { FormDataProps } from "../../types";

interface TeamStudentState {
  student: FormDataProps[];
  setStudent: (data: FormDataProps[]) => void;
}

const useTeamStore = create<TeamStudentState>((set) => ({
  student: [],
  setStudent: (data) => set({ student: data }),
}));

export { useTeamStore };
