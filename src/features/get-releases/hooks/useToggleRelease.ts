import { useToggleReleaseMutation } from "@/entities/apps/mutations";

export const useToggleRelease = (releaseId: string, enabled: boolean) => {
  const { mutateAsync, isPending } = useToggleReleaseMutation();

  const toggle = async () => {
    await mutateAsync({ releaseId, enabled });
  };

  return {
    toggle,
    isPending
  }
};
