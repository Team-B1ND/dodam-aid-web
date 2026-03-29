import { useDefaultInfoStore } from "@/features/register-app/stores/default-info";
import { useDetailInfoStore } from "@/features/register-app/stores/detail-info";
import { useTermsStore } from "@/features/register-app/stores/terms";

export const resetAllSections = () => {
  useDefaultInfoStore.getState().setDefaultInfo({
    name: "",
    icons: {
      lightMode: null,
      darkMode: null,
    },
  });
  useDetailInfoStore.getState().setDetailInfo({
    subtitle: "",
    githubReleaseUrl: "",
    description: "",
    inquiryMail: "",
  });
  useTermsStore.getState().setTerms({
    agrees: [false, false, false],
  });
};
