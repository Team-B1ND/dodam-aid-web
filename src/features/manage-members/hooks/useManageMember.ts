import { useCreateInviteMutation, useDeleteMemberMutation } from "@/entities/teams/mutations";
import { useGetMembers } from "@/features/get-team-detail/hooks/useGetMembers";
import { useGetTeamDetail } from "@/features/get-team-detail/hooks/useGetTeamDetail";
import { useState } from "react";

export const useManageMember = () => {
  const team = useGetTeamDetail();
  const member = useGetMembers();
  const [selected, setSelected] = useState<string[]>([]);
  const { mutateAsync, isPending } = useDeleteMemberMutation();
  const { mutateAsync: createInvite, isPending: isInviting } = useCreateInviteMutation();

  const isSelected = (userId: string) => selected.includes(userId);
  const candidates = member.filter((m) => !m.isOwner);

  const handleSelect = (userId: string) => {
    if (isSelected(userId)) {
      setSelected((prev) => prev.filter((s) => s !== userId));
    } else {
      setSelected((prev) => [...prev, userId]);
    }
  };

  const handleAll = () => {
    if (selected.length === candidates.length) {
      setSelected([]);
    } else {
      setSelected(candidates.map((m) => m.userId));
    }
  };

  const submit = async () => {
    if (!team.teamId) return;
    await mutateAsync({ teamId: team.teamId, users: selected });
  };

  const handleCopy = async () => {
    if (!team.teamId) return;
    await createInvite({ teamPublicId: team.teamId });
  };

  return {
    member,
    selected,
    isSelected,
    handleAll,
    handleSelect,
    submit,
    isPending,
    handleCopy,
    candidates,
    team
  };
};
