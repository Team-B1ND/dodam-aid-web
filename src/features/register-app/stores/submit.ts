import { create } from "zustand";

interface State {
  isSubmitted: boolean;
  setIsSubmitted: (isSubmitted: boolean) => void;
}

export const useSubmitStore = create<State>((set) => ({
  isSubmitted: false,
  setIsSubmitted: (isSubmitted) => set({ isSubmitted }),
}));
