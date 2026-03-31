import { create } from "zustand";

type Agrees = [boolean, boolean, boolean];

interface Terms {
  agrees: Agrees;
}

interface State {
  terms: Terms;
  setTerms: (terms: Terms) => void;
}

export const useTermsStore = create<State>((set) => ({
  terms: {
    agrees: [false, false, false],
  },
  setTerms: (terms) => set({ terms }),
}));
