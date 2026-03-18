import type { DropdownItem } from "@b1nd/dodam-design-system";
import { create } from "zustand";

interface Icons {
  lightMode: File | null;
  darkMode: File | null;
}

interface DefaultInfo {
  name: string;
  team: DropdownItem | null;
  icons: Icons;
}

interface State {
  defaultInfo: DefaultInfo;
  setDefaultInfo: (defaultInfo: DefaultInfo) => void;
}

export const useDefaultInfoStore = create<State>((set) => ({
  defaultInfo: {
    name: "",
    team: null,
    icons: {
      lightMode: null,
      darkMode: null,
    },
  },
  setDefaultInfo: (defaultInfo) => set({ defaultInfo }),
}));
