import { create } from "zustand";

interface Icons {
  lightMode: File | null;
  darkMode: File | null;
}

interface State {
  icons: Icons;
  setIcons: (icons: Icons) => void;
}

export const useIconsStore = create<State>((set) => ({
  icons: {
    lightMode: null,
    darkMode: null,
  },
  setIcons: (icons) => set({ icons }),
}));
