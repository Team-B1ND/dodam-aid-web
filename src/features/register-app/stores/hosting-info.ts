import { create } from "zustand";

interface HostingInfo {
  useServer: boolean;
  name: string;
  serverAddress: string;
  redirectPath: string;
}

interface State {
  hostingInfo: HostingInfo;
  setHostingInfo: (hostingInfo: HostingInfo) => void;
}

export const useHostingInfoStore = create<State>((set) => ({
  hostingInfo: {
      useServer: false,
      name: "",
      serverAddress: "",
      redirectPath: "",
    },
  setHostingInfo: (hostingInfo) => set({ hostingInfo }),
}));
