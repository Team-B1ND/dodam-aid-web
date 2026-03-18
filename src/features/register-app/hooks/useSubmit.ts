import { useRegisterAppMutation } from "@/entities/apps/mutations";
import { TOSAT_CONFIG } from "@/shared/constants/toast-config";
import { useUploads } from "@/shared/hooks/useUploads";
import { useToast } from "@b1nd/dodam-design-system";
import { useDefaultInfoStore } from "@/features/register-app/stores/default-info";
import { useDetailInfoStore } from "@/features/register-app/stores/detail-info";
import { useHostingInfoStore } from "@/features/register-app/stores/hosting-info";
import { useOtherInfoStore } from "@/features/register-app/stores/other-info";
import { useTermsStore } from "@/features/register-app/stores/terms";
import { useGetTeamDetail } from "@/features/get-team-detail/hooks/useGetTeamDetail";
import { resetAllSections } from "@/features/register-app/utils/reset-all-sections";
import { useLocation, useNavigate } from "react-router-dom";

export const useSubmit = () => {
  const { defaultInfo } = useDefaultInfoStore();
  const { detailInfo } = useDetailInfoStore();
  const { hostingInfo } = useHostingInfoStore();
  const { otherInfo } = useOtherInfoStore();
  const { terms } = useTermsStore();
  const toast = useToast();
  const { upload, isLoading } = useUploads();
  const { mutateAsync, isPending } = useRegisterAppMutation();
  const team = useGetTeamDetail();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const submit = async () => {
    if (
      !defaultInfo.name.trim() ||
      !detailInfo.subtitle.trim() ||
      !detailInfo.githubReleaseUrl.trim()
    ) {
      toast.warning("필수 입력 필드를 모두 채워주세요.", TOSAT_CONFIG);
      return;
    }

    if (!defaultInfo.icons.lightMode) {
      toast.warning("필수 입력 필드를 모두 채워주세요.", TOSAT_CONFIG);
      return;
    }

    if (!terms.agrees.every((item) => item)) {
      toast.warning("이용약관을 모두 확인해주세요.", TOSAT_CONFIG);
      return;
    }

    if (
      hostingInfo.useServer &&
      (!hostingInfo.name.trim() ||
        !hostingInfo.serverAddress.trim() ||
        !hostingInfo.redirectPath.trim())
    ) {
      toast.warning("필수 입력 필드를 모두 채워주세요.", TOSAT_CONFIG);
      return;
    }

    const iconUrl = await upload(defaultInfo.icons.lightMode);
    const darkIconUrl =
      defaultInfo.icons.darkMode && (await upload(defaultInfo.icons.darkMode));

    if (!iconUrl) return;

    const result = await mutateAsync({
      name: defaultInfo.name,
      subtitle: detailInfo.subtitle,
      description: detailInfo.description,
      inquiryMail: detailInfo.inquiryMail,
      teamId: team.teamId,
      iconUrl,
      darkIconUrl: darkIconUrl || undefined,
      githubReleaseUrl: detailInfo.githubReleaseUrl,
      server: hostingInfo.useServer
        ? {
            name: hostingInfo.name,
            serverAddress: hostingInfo.serverAddress,
            redirectPath: hostingInfo.redirectPath,
            omitApiPrefix: otherInfo.omitApiPrefix,
            usePushNotification: otherInfo.usePushNotification,
          }
        : undefined,
    });

    resetAllSections();

    navigate(`${pathname}/${result.data.data.appId}`);
  };

  return {
    submit,
    isProcessing: isLoading || isPending,
  };
};
