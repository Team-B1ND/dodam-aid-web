import { create } from "zustand";

interface Options {
  omitApiPrefix: boolean;
  usePushNotification: boolean;
}

interface State {
  options: Options;
  setOptions: (options: Options) => void;
}

export const useOptionsStore = create<State>((set) => ({
  options: {
    omitApiPrefix: false,
    usePushNotification: false,
  },
  setOptions: (options) => set({ options }),
}));
