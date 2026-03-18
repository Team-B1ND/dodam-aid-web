import { useRegisterReleaseMutation } from "@/entities/apps/mutations";
import { useGetAppDetail } from "@/features/get-app-detail/hooks/useGetAppDetail";
import { useToast } from "@b1nd/dodam-design-system";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useRegisterRelease = () => {
  const [releaseUrl, setReleaseUrl] = useState("");
  const [memo, setMemo] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const app = useGetAppDetail();
  const { pathname } = useLocation();
  const { mutateAsync, isPending } = useRegisterReleaseMutation();

  const validate = () => {
    if (!releaseUrl.trim() || !memo.trim()) return false;
    return true;
  };

  const submit = async () => {
    const isValidated = validate();
    if (!isValidated) {
      toast.warning("필수 입력 필드를 모두 채워주세요.");
      return;
    }

    await mutateAsync({ appId: app.appId, releaseUrl, memo });

    navigate(pathname.replace("/new", ""));
  };

  return {
    releaseUrl,
    setReleaseUrl,
    memo,
    setMemo,
    submit,
    isPending
  };
};
