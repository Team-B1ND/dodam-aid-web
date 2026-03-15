import type { DropdownItem } from "@b1nd/dodam-design-system";
import { create } from "zustand";

interface State {
  team: DropdownItem | null;
  setTeam: (item: DropdownItem | null) => void;
}

export const useTeamStore = create<State>((set) => ({
  team: null,
  setTeam: (team) => set({ team }),
}));
