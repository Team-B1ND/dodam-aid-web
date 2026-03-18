import { useIssueApiKeyMutation } from "@/entities/apps/mutations";
import { useGetAppDetail } from "@/features/get-app-detail/hooks/useGetAppDetail";
import { useState } from "react";

export const useIssueApiKey = () => {
  const [key, setKey] = useState("");
  const app = useGetAppDetail();
  const { mutateAsync, isPending } = useIssueApiKeyMutation();

  const issue = async () => {
    const { data } = await mutateAsync(app.appId);
    if (data.data.apiKey) setKey(data.data.apiKey);
  };

  return {
    issue,
    isPending,
    key,
  };
};
