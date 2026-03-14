import { create } from "zustand";

interface Checks {
  useServer: boolean;
  agrees: [boolean, boolean, boolean];
}

interface State {
  checks: Checks;
  setChecks: (checks: Checks) => void;
}

export const useChecksStore = create<State>((set) => ({
  checks: {
    useServer: false,
    agrees: [false, false, false],
  },
  setChecks: (checks) => set({ checks }),
}));
