import { useGetTeamDetail } from "@/features/get-team-detail/hooks/useGetTeamDetail";
import { useDefaultInfoStore } from "@/features/register-app/stores/default-info";
import { useDetailInfoStore } from "@/features/register-app/stores/detail-info";
import { useFileToImage } from "@/shared/hooks/useFileToImage";
import { useMemo } from "react";

export const usePreview = () => {
  const { defaultInfo } = useDefaultInfoStore();

  const { detailInfo } = useDetailInfoStore();

  const files = useMemo(
    () => [defaultInfo.icons.lightMode, defaultInfo.icons.darkMode] as const,
    [defaultInfo.icons.lightMode, defaultInfo.icons.darkMode],
  );
  const previews = useFileToImage(files);
  const team = useGetTeamDetail();

  return {
    name: defaultInfo.name,
    subtitle: detailInfo.subtitle,
    description: detailInfo.description,
    teamName: team.name,
    iconUrl: previews[0],
    darkIconUrl: previews[1],
  };
};
