import { create } from "zustand";
import { TableDataProps } from "../types";

interface studentState {
  table: TableDataProps[];
  setTable: (data: TableDataProps[]) => void;
}

const useTableStore = create<studentState>((set) => ({
  table: [],
  setTable: (data) => set({ table: data }),
}));

export { useTableStore };
