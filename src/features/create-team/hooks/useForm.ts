import { useCreateTeamMutation } from "@/entities/teams/mutations";
import { useFormStore } from "@/features/create-team/stores/form";
import { useLogoStore } from "@/features/create-team/stores/logo";
import { TOSAT_CONFIG } from "@/shared/constants/toast-config";
import { useUploads } from "@/shared/hooks/useUploads";
import { useToast } from "@b1nd/dodam-design-system";
import type { ChangeEvent } from "react";

export const useForm = () => {
  const { form, setForm } = useFormStore();
  const { logo, setLogo } = useLogoStore();
  const { upload, isLoading } = useUploads();
  const toast = useToast();

  const handleTextForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogo = (value: File | null) => {
    setLogo(value);
  };

  const validate = () => {
    const { name, description, githubUrl } = form;
    if (!name.trim() || !description.trim() || !githubUrl.trim()) return false;
    return true;
  };

  const initForm = () => {
    setForm({
      name: "",
      description: "",
      githubUrl: "",
      iconUrl: "",
    });
    setLogo(null);
  };

  const { mutateAsync, isPending } = useCreateTeamMutation(initForm);

  const submit = async () => {
    const isValidated = validate();
    if (!isValidated || !logo) {
      toast.warning("필수 입력 필드를 모두 채워주세요.", TOSAT_CONFIG);
      return;
    }
    const iconUrl = await upload(logo);
    if (!iconUrl) return;
    return await mutateAsync({ ...form, iconUrl });
  };

  return {
    logo,
    form,
    handleLogo,
    handleTextForm,
    submit,
    isProcessing: isLoading || isPending,
  };
};
