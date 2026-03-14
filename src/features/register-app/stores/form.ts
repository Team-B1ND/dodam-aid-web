import type { CreateApp } from "@/entities/apps/types/dto/req";
import { create } from "zustand";

interface State {
  form: CreateApp;
  setForm: (form: CreateApp) => void;
}

export const useFormStore = create<State>((set) => ({
  form: {
    name: "",
    subtitle: "",
    description: "",
    inquiryMail: "",
    teamId: "",
    darkIconUrl: "",
    iconUrl: "",
    githubReleaseUrl: ""
  },
  setForm: (form) => set({ form }),
}));
