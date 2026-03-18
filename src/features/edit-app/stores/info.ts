import { create } from "zustand";

interface Info {
  iconUrl: string;
  darkIconUrl?: string;
  description: string;
  inquiryMail: string;
  subtitle: string;
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
    subtitle: ""
  },
  setInfo: (info) => set({ info }),
}));
