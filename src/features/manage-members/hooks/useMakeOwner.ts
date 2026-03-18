import { useMakeOwnerMutation } from "@/entities/teams/mutations";
import { useGetTeamDetail } from "@/features/get-team-detail/hooks/useGetTeamDetail";

export const useMakeOwner = (userPublicId?: string) => {
  const { teamId } = useGetTeamDetail();
  const { mutateAsync, isPending } = useMakeOwnerMutation();

  const makeOwner = async () => {
    if (!userPublicId) return;
    await mutateAsync({ teamId, userPublicId });
  };

  return {
    makeOwner,
    isPending,
  };
};
