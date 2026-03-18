import { useDefaultInfoStore } from "@/features/register-app/stores/default-info";
import type { ChangeEvent } from "react";

export const useDefaultInfo = () => {
  const { defaultInfo, setDefaultInfo } = useDefaultInfoStore();

  const handleTextForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDefaultInfo({ ...defaultInfo, [name]: value });
  };

  const handleIcon = async (
    name: "lightMode" | "darkMode",
    value: File | null,
  ) => {
    setDefaultInfo({
      ...defaultInfo,
      icons: {
        ...defaultInfo.icons,
        [name]: value,
      },
    });
  };

  return {
    defaultInfo,
    handleTextForm,
    handleIcon,
  };
};
