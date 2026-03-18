import { useUpdateAppMutation } from "@/entities/apps/mutations";
import { useInfoStore } from "@/features/edit-app/stores/info";
import { useOptionsStore } from "@/features/edit-app/stores/options";
import { useServerStore } from "@/features/edit-app/stores/server";
import { useGetAppDetail } from "@/features/get-app-detail/hooks/useGetAppDetail";
import { TOSAT_CONFIG } from "@/shared/constants/toast-config";
import { useToast } from "@b1nd/dodam-design-system";

export const useSubmit = (finishEdit: () => void) => {
  const app = useGetAppDetail();
  const { info } = useInfoStore();
  const { server } = useServerStore();
  const { options } = useOptionsStore();
  const toast = useToast();

  const validate = () => {
    if (
      server.useServer &&
      (!server.name.trim() ||
        !server.redirectPath.trim() ||
        !server.serverAddress.trim())
    ) {
      return false;
    }
    return true;
  };

  const { mutateAsync, isPending } = useUpdateAppMutation();

  const hasChangedInfo = () => {
    return (
      app.subtitle !== info.subtitle ||
      app.description !== info.description ||
      app.iconUrl !== info.iconUrl ||
      app.darkIconUrl !== info.darkIconUrl ||
      app.inquiryMail !== info.inquiryMail
    );
  };

  const hasChangedServer = () => {
    if (!app.server && !server.useServer) return false;
    if (!app.server && server.useServer) return true;
    if (app.server && !server.useServer) return true;

    return (
      app.server!.name !== server.name ||
      app.server!.serverAddress !== server.serverAddress ||
      app.server!.redirectPath !== server.redirectPath ||
      app.server!.omitApiPrefix !== options.omitApiPrefix ||
      app.server!.usePushNotification !== options.usePushNotification
    );
  };

  const submit = async () => {
    const isValidated = validate();

    if (!isValidated) {
      toast.warning("필수 입력 필드를 모두 채워주세요.", TOSAT_CONFIG);
      return;
    }

    if (!hasChangedInfo() && !hasChangedServer()) {
      finishEdit();
      return;
    }

    await mutateAsync({
      appId: app.appId,
      name: app.name,
      subtitle: info.subtitle,
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

  return {
    submit,
    isPending,
  };
};
