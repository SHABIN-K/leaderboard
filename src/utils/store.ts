import { create } from "zustand";
import { TableDataProps } from "../types";

interface State {
  table: TableDataProps[];
  setTable: (newTableData: TableDataProps[]) => void;
}

// Create a Zustand store
export const useTableStore = create<State>((set) => ({
  table: [],
  setTable: (newTableData) => set({ table: newTableData }),
}));
