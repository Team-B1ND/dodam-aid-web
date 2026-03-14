import { FORM_KEYS } from "@/features/register-app/constants/form-keys";

export const isFilled = (
  form: Record<string, unknown>,
  icons: { lightMode: File | null; darkMode: File | null },
) => {
  const hasFormValue = FORM_KEYS.some((key) => !!form[key]);
  const hasIcon = icons.lightMode !== null || icons.darkMode !== null;
  return hasFormValue || hasIcon;
};
