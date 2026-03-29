import { useDefaultInfoStore } from "@/features/register-app/stores/default-info";
import { useDetailInfoStore } from "@/features/register-app/stores/detail-info";
import { useTermsStore } from "@/features/register-app/stores/terms";
import { isFilled } from "@/features/register-app/utils/is-filled";
import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

const getCurrentFormState = () => {
  const currentDefaultInfo = useDefaultInfoStore.getState().defaultInfo;
  const currentDetailInfo = useDetailInfoStore.getState().detailInfo;
  const currentTerms = useTermsStore.getState().terms;

  return {
    defaultInfo: currentDefaultInfo,
    detailInfo: currentDetailInfo,
    terms: currentTerms,
  };
};

export const useLeaveConfirm = () => {
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname &&
      isFilled(getCurrentFormState()),
  );

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isFilled(getCurrentFormState())) return;

      e.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return { blocker };
};
