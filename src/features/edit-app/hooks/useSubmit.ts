import { useUpdateAppMutation } from "@/entities/apps/mutations";
import { useInfoStore } from "@/features/edit-app/stores/info";
import { useGetAppDetail } from "@/features/get-app-detail/hooks/useGetAppDetail";
import { TOSAT_CONFIG } from "@/shared/constants/toast-config";
import { useToast } from "@b1nd/dodam-design-system";

export const useSubmit = (finishEdit: () => void) => {
  const app = useGetAppDetail();
  const { info } = useInfoStore();
  const toast = useToast();

  const validate = () => {
    if (
      !info.subtitle.trim() ||
      !info.description.trim() ||
      !info.inquiryMail.trim()
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

  const submit = async () => {
    const isValidated = validate();

    if (!isValidated) {
      toast.warning("필수 입력 필드를 모두 채워주세요.", TOSAT_CONFIG);
      return;
    }

    if (!hasChangedInfo()) {
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
    });

    finishEdit();
  };

  return {
    submit,
    isPending,
  };
};
