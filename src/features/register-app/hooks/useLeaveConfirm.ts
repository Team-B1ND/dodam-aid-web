import { useFormStore } from "@/features/register-app/stores/form";
import { useIconsStore } from "@/features/register-app/stores/icons";
import { isFilled } from "@/features/register-app/utils/is-filled";
import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

export const useLeaveConfirm = () => {
  const form = useFormStore((state) => state.form);
  const icons = useIconsStore((state) => state.icons);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => {
      const currentForm = useFormStore.getState().form;
      const currentIcons = useIconsStore.getState().icons;

      return (
        currentLocation.pathname !== nextLocation.pathname &&
        isFilled(currentForm, currentIcons)
      );
    }
  );

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isFilled(form, icons)) return;
      e.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [form, icons]);

  return { blocker };
};
