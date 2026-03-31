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
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: ["team"] });
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

export const useDeleteMemberMutation = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TeamApi.deleteMember,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({
        queryKey: ["team"],
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

export const useDeleteTeamMutation = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TeamApi.deleteTeam,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({
        queryKey: ["team"],
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

export const useCreateInviteMutation = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: TeamApi.createInvite,
    onSuccess: async (res) => {
      const inviteCode = res.data.data.inviteCode;
      const url = `https://aid.b1nd.com/team/invite/${inviteCode}`;
      await navigator.clipboard.writeText(url);
      toast.success("초대 링크가 복사되었어요.", TOSAT_CONFIG);
    },
    onError: (e: ErrorResponse) => {
      toast.error(
        e.response?.data.message || "초대 링크 생성에 실패했어요.",
        TOSAT_CONFIG,
      );
    },
  });
};

export const useAcceptInviteMutation = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TeamApi.acceptInvite,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: ["team"] });
      toast.success(res.data.message || "팀에 참여했어요!", TOSAT_CONFIG);
      navigate("/teams", { replace: true });
    },
    onError: (e: ErrorResponse) => {
      toast.error(
        e.response?.data.message || "초대 수락에 실패했어요.",
        TOSAT_CONFIG,
      );
      navigate("/teams", { replace: true });
    },
  });
};

export const useMakeOwnerMutation = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TeamApi.makeOwner,
    onSuccess: async (res) => {
      await queryClient.refetchQueries({
        queryKey: ["team"],
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
