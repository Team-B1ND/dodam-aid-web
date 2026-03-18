import { AppApi } from "@/entities/apps/api";
import { TOSAT_CONFIG } from "@/shared/constants/toast-config";
import type { ErrorResponse } from "@/shared/types/error-response";
import { useToast } from "@b1nd/dodam-design-system";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRegisterAppMutation = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AppApi.registerApp,
    onSuccess: async (res, req) => {
      await queryClient.refetchQueries({
        queryKey: ["app", "team", req.teamId],
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

export const useRegisterReleaseMutation = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AppApi.registerRelease,
    onSuccess: async (res, req) => {
      await queryClient.refetchQueries({
        queryKey: ["app", req.appId, "release"],
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
