import { useOptionsStore } from "@/features/edit-app/stores/options";
import { useGetAppDetail } from "@/features/get-app-detail/hooks/useGetAppDetail";
import { useEffect } from "react";

export const useEditOptions = () => {
  const app = useGetAppDetail();
  const { options, setOptions } = useOptionsStore();

  useEffect(() => {
    if (!app.server) return;
    setOptions({
      omitApiPrefix: app.server?.omitApiPrefix,
      usePushNotification: app.server?.usePushNotification,
    });
  }, [app]);

  const handleOption = (key: "omitApiPrefix" | "usePushNotification") => {
  setOptions({
    ...options,
    [key]: !options[key],
  });
};

  return {
    options,
    handleOption,
  };
};


