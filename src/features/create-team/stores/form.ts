import type { CreateTeam } from "@/entities/teams/types/dto/req";
import { create } from "zustand";

interface State {
  form: CreateTeam;
  setForm: (form: CreateTeam) => void;
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
