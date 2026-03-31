import type { CreateTeamReq } from "@/entities/teams/types/dto/req";
import { create } from "zustand";

interface State {
  form: CreateTeamReq;
  setForm: (form: CreateTeamReq) => void;
}

export const useFormStore = create<State>((set) => ({
  form: {
    name: "",
    description: "",
    githubUrl: "",
    iconUrl: "",
  },
  setForm: (form) => set({ form }),
}));
