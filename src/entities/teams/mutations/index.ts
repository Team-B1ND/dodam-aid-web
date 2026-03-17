import { TeamApi } from "@/entities/teams/api";
import { TOSAT_CONFIG } from "@/shared/constants/toast-config";
import type { ErrorResponse } from "@/shared/types/error-response";
import { useToast } from "@b1nd/dodam-design-system";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useCreateTeamMutation = (initData: () => void) => {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TeamApi.createTeam,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: ["team", "me"] });
      initData();
      toast.success(res.data.message, TOSAT_CONFIG);
      navigate(`/teams/${res.data.data.teamId}`);
    },
    onError: (e: ErrorResponse) => {
      toast.error(
        e.response?.data.message || "요청을 처리하지 못했어요.",
        TOSAT_CONFIG,
      );
    },
  });
};

export const useUpdateTeamMutation = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TeamApi.updateTeam,
    onSuccess: async (res, req) => {
      await queryClient.refetchQueries({ queryKey: ["team", "me"] });
      await queryClient.refetchQueries({ queryKey: ["team", req.teamId] });
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
