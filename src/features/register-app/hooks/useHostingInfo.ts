import { useHostingInfoStore } from "@/features/register-app/stores/hosting-info";
import type { ChangeEvent } from "react";

export const useHostingInfo = () => {
  const { hostingInfo, setHostingInfo } = useHostingInfoStore();

  const handleTextForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHostingInfo({ ...hostingInfo, [name]: value });
  };

  const handleSwitch = () => {
    setHostingInfo({ ...hostingInfo, useServer: !hostingInfo.useServer });
  };

  return {
    hostingInfo,
    handleTextForm,
    handleSwitch,
  };
};
