import type { CreateAppReq } from "@/entities/apps/types/dto/req";
import { create } from "zustand";

interface State {
  form: CreateAppReq;
  setForm: (form: CreateAppReq) => void;
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
