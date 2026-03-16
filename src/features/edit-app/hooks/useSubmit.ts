import { useInfoStore } from "@/features/edit-app/stores/info";
import { useOptionsStore } from "@/features/edit-app/stores/options";
import { useServerStore } from "@/features/edit-app/stores/server";
import { useGetAppDetail } from "@/features/get-app-detail/hooks/useGetAppDetail";

export const useSubmit = (finishEdit: () => void) => {
  const app = useGetAppDetail();
  const { info } = useInfoStore();
  const { server } = useServerStore();
  const { options } = useOptionsStore();

  const submit = async () => {
    console.log({
      appId: app.appId,
      name: app.name,
      subtitle: app.subtitle,
      description: info.description,
      iconUrl: info.iconUrl,
      darkIconUrl: info.darkIconUrl,
      inquiryMail: info.inquiryMail,
      server: server.useServer
        ? {
            name: server.name,
            serverAddress: server.serverAddress,
            redirectPath: server.redirectPath,
            omitApiPrefix: options.omitApiPrefix,
            usePushNotification: options.usePushNotification,
          }
        : undefined,
    });
    finishEdit();
  };

  return submit;
};
