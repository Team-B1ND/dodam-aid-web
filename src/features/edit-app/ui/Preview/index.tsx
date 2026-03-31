import { useGetAppDetail } from "@/features/get-app-detail/hooks/useGetAppDetail";
import { useInfoStore } from "@/features/edit-app/stores/info";
import AppPreview from "@/widgets/app-preview/ui/AppPreview";
import { useGetTeamDetail } from "@/features/get-team-detail/hooks/useGetTeamDetail";

const Preview = () => {
  const app = useGetAppDetail();
  const team = useGetTeamDetail();
  const { info } = useInfoStore();

  return (
    <AppPreview
      name={app.name}
      subtitle={app.subtitle}
      teamName={team.name}
      description={info.description}
      iconUrl={info.iconUrl}
      darkIconUrl={info.darkIconUrl}
      enablePushLink={app.name === "도담도담"}
    />
  );
};

Preview.Skeleton = () => {
  return <AppPreview />;
};

export default Preview;
