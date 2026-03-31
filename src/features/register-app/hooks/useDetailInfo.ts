import { useDetailInfoStore } from "@/features/register-app/stores/detail-info";
import type { ChangeEvent } from "react";

export const useDetailInfo = () => {
  const { detailInfo, setDetailInfo } = useDetailInfoStore();

  const handleTextForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetailInfo({ ...detailInfo, [name]: value });
  };

  return {
    detailInfo,
    handleTextForm,
  };
};
