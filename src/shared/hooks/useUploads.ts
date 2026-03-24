import type { ErrorResponse } from "@/shared/types/error-response";
import { useToast } from "@b1nd/dodam-design-system";
import axios from "axios";
import { useState } from "react";

export const useUploads = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const upload = async (file: File) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post<{ url: string }>(
        "https://cloud.cher1shrxd.me/files/upload",
        formData,
      );

      return data.url;
    } catch (err) {
      const error = err as ErrorResponse;
      toast.error(
        error.response?.data.message || "이미지 업로드에 실패했어요.",
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    upload,
    isLoading
  }
};
