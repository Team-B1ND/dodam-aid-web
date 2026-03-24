import { create } from "zustand";

interface DetailInfo {
  subtitle: string;
  githubReleaseUrl: string;
  description: string;
  inquiryMail: string;
}

interface State {
  detailInfo: DetailInfo;
  setDetailInfo: (detailInfo: DetailInfo) => void;
}

export const useDetailInfoStore = create<State>((set) => ({
  detailInfo: {
      subtitle: "",
      githubReleaseUrl: "",
      description: "",
      inquiryMail: "",
    },
  setDetailInfo: (detailInfo) => set({ detailInfo }),
}));
