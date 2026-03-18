import { useOtherInfoStore } from "@/features/register-app/stores/other-info";

export const useOtherInfo = () => {
  const { otherInfo, setOtherInfo } = useOtherInfoStore();

  const handleOption = (key: "omitApiPrefix" | "usePushNotification") => {
    setOtherInfo({
      ...otherInfo,
      [key]: !otherInfo[key],
    });
  };

  return {
    otherInfo,
    handleOption,
  };
};
