import { create } from "zustand";

interface Info {
  iconUrl: string;
  darkIconUrl?: string;
  description: string;
  inquiryMail: string;
}

interface State {
  info: Info;
  setInfo: (info: Info) => void;
}

export const useInfoStore = create<State>((set) => ({
  info: {
    iconUrl: "",
    description: "",
    inquiryMail: "",
  },
  setInfo: (info) => set({ info }),
}));
