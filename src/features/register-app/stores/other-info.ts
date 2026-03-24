import { create } from "zustand";

interface OtherInfo {
  omitApiPrefix: boolean;
  usePushNotification: boolean;
}

interface State {
  otherInfo: OtherInfo;
  setOtherInfo: (otherInfo: OtherInfo) => void;
}

export const useOtherInfoStore = create<State>((set) => ({
  otherInfo: {
      omitApiPrefix: false,
      usePushNotification: false,
    },
  setOtherInfo: (otherInfo) => set({ otherInfo }),
}));
