import { useForm } from "@/features/register-app/hooks/useForm";
import { isFilled } from "@/features/register-app/utils/is-filled";
import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

export const useLeaveConfirm = () => {
  const { form, icons } = useForm();

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname && isFilled(form, icons)
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
