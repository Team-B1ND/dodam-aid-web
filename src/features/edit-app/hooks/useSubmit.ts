import { useUpdateAppMutation } from "@/entities/apps/mutations";
import { useInfoStore } from "@/features/edit-app/stores/info";
import { useOptionsStore } from "@/features/edit-app/stores/options";
import { useServerStore } from "@/features/edit-app/stores/server";
import { useGetAppDetail } from "@/features/get-app-detail/hooks/useGetAppDetail";
import { TOSAT_CONFIG } from "@/shared/constants/toast-config";
import { useToast } from "@b1nd/dodam-design-system";

export const useSubmit = (finishEdit: () => void) => {
  const app = useGetAppDetail();
  const { info, setInfo } = useInfoStore();
  const { server, setServer } = useServerStore();
  const { options, setOptions } = useOptionsStore();
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

  const initForm = () => {
    setInfo({
      description: app.description,
      iconUrl: app.iconUrl,
      inquiryMail: app.inquiryMail,
      darkIconUrl: app.darkIconUrl,
    });
    setServer({
      name: app.server?.name || "",
      redirectPath: app.server?.redirectPath || "",
      serverAddress: app.server?.serverAddress || "",
      useServer: !!app.server,
    });
    setOptions({
      omitApiPrefix: app.server?.omitApiPrefix || false,
      usePushNotification: app.server?.usePushNotification || false,
    });
  };

  const { mutateAsync, isPending } = useUpdateAppMutation(initForm);

  const submit = async () => {
    const isValidated = validate();

    if (!isValidated) {
      toast.warning("필수 입력 필드를 모두 채워주세요.", TOSAT_CONFIG);
      return;
    }

    await mutateAsync({
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

  return {
    submit,
    isPending,
  };
};
