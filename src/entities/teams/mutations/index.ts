import { TeamApi } from "@/entities/teams/api";
import { TOSAT_CONFIG } from "@/shared/constants/toast-config";
import type { ErrorResponse } from "@/shared/types/error-response";
import { useToast } from "@b1nd/dodam-design-system";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useCreateTeamMutation = () => {
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: TeamApi.createTeam,
    onSuccess: (res) => {
      toast.success(res.data.message, TOSAT_CONFIG);
      navigate(`/teams/${res.data.data.teamId}`);
    },
    onError: (e: ErrorResponse) => {
      toast.error(e.response?.data.message || "요청을 처리하지 못했어요.", TOSAT_CONFIG);
    },
  });
};
