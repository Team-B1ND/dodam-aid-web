import { useDefaultInfoStore } from "@/features/register-app/stores/default-info";
import { useDetailInfoStore } from "@/features/register-app/stores/detail-info";
import { useHostingInfoStore } from "@/features/register-app/stores/hosting-info";
import { useOtherInfoStore } from "@/features/register-app/stores/other-info";
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
  useHostingInfoStore.getState().setHostingInfo({
    useServer: false,
    name: "",
    serverAddress: "",
    redirectPath: "",
  });
  useOtherInfoStore.getState().setOtherInfo({
    omitApiPrefix: false,
    usePushNotification: false,
  });
  useTermsStore.getState().setTerms({
    agrees: [false, false, false],
  });
};
