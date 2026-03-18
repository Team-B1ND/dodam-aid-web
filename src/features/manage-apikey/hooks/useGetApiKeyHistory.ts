import { useGetApiKeyHistoryQuery } from "@/entities/apps/queries";
import { useGetAppDetail } from "@/features/get-app-detail/hooks/useGetAppDetail";

export const useGetApiKeyHistory = () => {
  const app = useGetAppDetail();
  const { data } = useGetApiKeyHistoryQuery(app.appId);

  return data.data.data;
};
