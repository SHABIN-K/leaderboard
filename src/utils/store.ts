import { create } from "zustand";
import { TableDataProps, TeamProps } from "../types";

interface studentState {
  table: TableDataProps[];
  setTable: (data: TableDataProps[]) => void;
}
interface TeamState {
  team: TeamProps[];
  setTeam: (data: TeamProps[]) => void;
}

const useTableStore = create<studentState>((set) => ({
  table: [],
  setTable: (data) => set({ table: data }),
}));

const useTeamStore = create<TeamState>((set) => ({
  team: [],
  setTeam: (data) => set({ team: data }),
}));

export { useTableStore, useTeamStore };
