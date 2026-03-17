import { AppApi } from "@/entities/apps/api";
import { TOSAT_CONFIG } from "@/shared/constants/toast-config";
import type { ErrorResponse } from "@/shared/types/error-response";
import { useToast } from "@b1nd/dodam-design-system";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useRegisterAppMutation = (initData: () => void) => {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AppApi.registerApp,
    onSuccess: async (res, req) => {
      await queryClient.refetchQueries({
        queryKey: ["app", "team", req.teamId],
      });
      initData();
      toast.success(res.data.message, TOSAT_CONFIG);
      navigate(`/teams/${req.teamId}/${res.data.data.appId}`);
    },
    onError: (e: ErrorResponse) => {
      toast.error(
        e.response?.data.message || "요청을 처리하지 못했어요.",
        TOSAT_CONFIG,
      );
    },
  });
};

export const useUpdateAppMutation = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AppApi.updateApp,
    onSuccess: async (res, req) => {
      await queryClient.refetchQueries({
        queryKey: ["app", req.appId],
      });
      toast.success(res.data.message, TOSAT_CONFIG);
    },
    onError: (e: ErrorResponse) => {
      toast.error(
        e.response?.data.message || "요청을 처리하지 못했어요.",
        TOSAT_CONFIG,
      );
    },
  });
};
