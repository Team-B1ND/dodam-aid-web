import { useUpdateTeamMutation } from "@/entities/teams/mutations";
import { useGetTeamDetail } from "@/features/get-team-detail/hooks/useGetTeamDetail";
import { useUploads } from "@/shared/hooks/useUploads";
import { useToast } from "@b1nd/dodam-design-system";
import { useState, type ChangeEvent } from "react";

export const useEditTeam = (turnToReadMode: () => void) => {
  const team = useGetTeamDetail();
  const [form, setForm] = useState({
    name: team.name,
    iconUrl: team.iconUrl,
    description: team.description,
    githubUrl: team.githubUrl,
  });
  const { upload, isLoading } = useUploads();
  const toast = useToast();
  const { mutateAsync, isPending } = useUpdateTeamMutation();

  const handleTextForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleIcon = async (value: File | null) => {
    if (!value) return;
    const url = await upload(value);
    if (!url) return;
    setForm((prev) => ({ ...prev, iconUrl: url }));
  };

  const validate = () => {
    const { name, iconUrl, description, githubUrl } = form;
    if (
      !name.trim() ||
      !iconUrl.trim() ||
      !description.trim() ||
      !githubUrl.trim()
    )
      return false;
    return true;
  };

  const getChangedValue = (origin: string, current: string) => {
    const next = current.trim();
    return origin.trim() !== next ? next : undefined;
  };

  const submit = async () => {
    const isValidated = validate();
    if (!isValidated) {
      toast.warning("필수 입력 필드를 모두 채워주세요.");
      return;
    }
    await mutateAsync({
      teamId: team.teamId,
      description: getChangedValue(team.description, form.description),
      githubUrl: getChangedValue(team.githubUrl, form.githubUrl),
      iconUrl: getChangedValue(team.iconUrl, form.iconUrl),
      name: getChangedValue(team.name, form.name),
    });
    turnToReadMode();
  };

  return {
    form,
    handleTextForm,
    handleIcon,
    isLoading,
    submit,
    isPending,
  };
};
