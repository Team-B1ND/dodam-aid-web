import { useChecksStore } from "@/features/register-app/stores/checks";
import { useFormStore } from "@/features/register-app/stores/form";
import { useIconsStore } from "@/features/register-app/stores/icons";
import type { CreateAppReq } from "@/entities/apps/types/dto/req";

type ServerFields = NonNullable<CreateAppReq["server"]>;
type FormFields = Omit<CreateAppReq, "server">;

export const useForm = () => {
  const { form, setForm } = useFormStore();
  const { checks, setChecks } = useChecksStore();
  const { icons, setIcons } = useIconsStore();

  const handleField = <K extends keyof FormFields>(
    key: K,
    value: FormFields[K],
  ) => {
    setForm({ ...form, [key]: value });
  };

  const handleServerField = <K extends keyof ServerFields>(
    key: K,
    value: ServerFields[K],
  ) => {
    setForm({
      ...form,
      server: { ...form.server, [key]: value } as ServerFields,
    });
  };

  const handleUseServer = () => {
    setChecks({ ...checks, useServer: !checks.useServer });
  };

  const handleAgree = (index: 0 | 1 | 2) => {
    const agrees = [...checks.agrees] as [boolean, boolean, boolean];
    agrees[index] = !checks.agrees[index];
    setChecks({ ...checks, agrees });
  };

  const handleIcons = (key: "lightMode" | "darkMode", value: File | null) => {
    setIcons({ ...icons, [key]: value });
  };

  const submit = () => {
    console.log({
      ...form,
    });
  };

  return {
    form,
    handleField,
    handleServerField,
    checks,
    handleUseServer,
    handleAgree,
    icons,
    handleIcons,
    submit,
  };
};
