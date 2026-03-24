import { create } from "zustand";

interface Server {
  useServer: boolean;
  name: string;
  serverAddress: string;
  redirectPath: string;
}

interface State {
  server: Server;
  setServer: (server: Server) => void;
}

export const useServerStore = create<State>((set) => ({
  server: {
    useServer: false,
    name: "",
    serverAddress: "",
    redirectPath: "",
  },
  setServer: (server) => set({ server }),
}));
