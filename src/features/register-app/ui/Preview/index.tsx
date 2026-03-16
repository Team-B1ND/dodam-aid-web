import { useForm } from "@/features/register-app/hooks/useForm";
import { useFileToImage } from "@/shared/hooks/useFileToImage";
import AppPreview from "@/widgets/app-preview/ui/AppPreview";
import { useMemo } from "react";

const Preview = () => {
  const { form, icons, team } = useForm();
  const files = useMemo(
    () => [icons.lightMode, icons.darkMode] as const,
    [icons.lightMode, icons.darkMode],
  );
  const previews = useFileToImage(files);

  return (
    <AppPreview
      name={form.name}
      subtitle={form.subtitle}
      description={form.description}
      teamName={team?.name}
      iconUrl={previews[0]}
      darkIconUrl={previews[1]}
      enablePushLink={form.name === "도담도담"}
    />
  );
};

export default Preview;
