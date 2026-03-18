import { useInfoStore } from "@/features/edit-app/stores/info";
import { useGetAppDetail } from "@/features/get-app-detail/hooks/useGetAppDetail";
import { useUploads } from "@/shared/hooks/useUploads";
import { useEffect, type ChangeEvent } from "react";

export const useEditInfo = () => {
  const app = useGetAppDetail();
  const { info, setInfo } = useInfoStore();
  const { upload, isLoading } = useUploads();

  useEffect(() => {
    setInfo({
      description: app.description,
      iconUrl: app.iconUrl,
      inquiryMail: app.inquiryMail,
      darkIconUrl: app.darkIconUrl,
      subtitle: app.subtitle,
    });
  }, [app]);

  const handleTextForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleIcon = async (
    name: "iconUrl" | "darkIconUrl",
    value: File | null,
  ) => {
    if (!value) return;
    const url = await upload(value);
    if (!url) return;
    setInfo({ ...info, [name]: url });
  };

  const removeIcon = async () => {
    setInfo({ ...info, darkIconUrl: undefined });
  };

  return {
    info,
    handleIcon,
    handleTextForm,
    isLoading,
    removeIcon,
  };
};
