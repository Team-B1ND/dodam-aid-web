import { create } from "zustand";

interface Icons {
  lightMode: File | null;
  darkMode: File | null;
}

interface DefaultInfo {
  name: string;
  icons: Icons;
}

interface State {
  defaultInfo: DefaultInfo;
  setDefaultInfo: (defaultInfo: DefaultInfo) => void;
}

export const useDefaultInfoStore = create<State>((set) => ({
  defaultInfo: {
    name: "",
    icons: {
      lightMode: null,
      darkMode: null,
    },
  },
  setDefaultInfo: (defaultInfo) => set({ defaultInfo }),
}));
