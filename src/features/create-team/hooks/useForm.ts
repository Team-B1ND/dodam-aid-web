import { useFormStore } from "@/features/create-team/stores/form";
import { useLogoStore } from "@/features/create-team/stores/logo";
import type { ChangeEvent } from "react";

export const useForm = () => {
  const { form, setForm } = useFormStore();
  const { logo, setLogo } = useLogoStore();

  const handleTextForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogo = (value: File | null) => {
    setLogo(value);
  };

  return {
    logo,
    form,
    handleLogo,
    handleTextForm,
  };
};
