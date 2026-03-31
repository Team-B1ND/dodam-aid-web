import { usePreview } from "@/features/register-app/hooks/usePreview";
import AppPreview from "@/widgets/app-preview/ui/AppPreview";

const Preview = () => {
  const { name, subtitle, description, teamName, iconUrl, darkIconUrl } =
    usePreview();

  return (
    <AppPreview
      name={name}
      subtitle={subtitle}
      description={description}
      teamName={teamName}
      iconUrl={iconUrl}
      darkIconUrl={darkIconUrl}
      enablePushLink={name === "도담도담"}
    />
  );
};

export default Preview;
