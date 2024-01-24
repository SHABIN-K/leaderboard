import { create } from "zustand";
import { FormDataProps, TableDataProps, TeamProps } from "../types";

interface studentState {
  table: TableDataProps[];
  setTable: (data: TableDataProps[]) => void;
}

interface selectedState {
  selected: FormDataProps[];
  setSelected: (data: FormDataProps[]) => void;
}

interface TeamState {
  team: TeamProps[];
  setTeam: (data: TeamProps[]) => void;
}

interface LoaderState {
  isEdit: boolean;
  setIsEdit: (newIsLoading: boolean) => void;
  isDelConfirm: boolean;
  setDelIsConfirm: (newIsLoading: boolean) => void;
  isLogOutConfirm: boolean;
  setLogOutIsConfirm: (newIsLoading: boolean) => void;
}

const useTableStore = create<studentState>((set) => ({
  table: [],
  setTable: (data) => set({ table: data }),
}));

const useTeamStore = create<TeamState>((set) => ({
  team: [],
  setTeam: (data) => set({ team: data }),
}));

const useLoader = create<LoaderState>((set) => ({
  isEdit: false,
  setIsEdit: (newIsLoading: boolean) => set({ isEdit: newIsLoading }),
  isDelConfirm: false,
  setDelIsConfirm: (newIsLoading: boolean) =>
    set({ isDelConfirm: newIsLoading }),
  isLogOutConfirm: false,
  setLogOutIsConfirm: (newIsLoading: boolean) =>
    set({ isLogOutConfirm: newIsLoading }),
}));

const useSelectedStore = create<selectedState>((set) => ({
  selected: [],
  setSelected: (data) => set({ selected: data }),
}));

export { useTableStore, useTeamStore, useLoader, useSelectedStore };
`1`;
