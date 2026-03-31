import { create } from "zustand";

interface State {
  logo: File | null;
  setLogo: (logo: File | null) => void;
}

export const useLogoStore = create<State>((set) => ({
  logo: null,
  setLogo: (logo) => set({ logo }),
}));
