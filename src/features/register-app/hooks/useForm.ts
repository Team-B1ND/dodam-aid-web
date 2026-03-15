import { useChecksStore } from "@/features/register-app/stores/checks";
import { useFormStore } from "@/features/register-app/stores/form";
import { useIconsStore } from "@/features/register-app/stores/icons";
import type { CreateAppReq } from "@/entities/apps/types/dto/req";
import { useGetTeamsQuery } from "@/entities/teams/queries";
import { useToast, type DropdownItem } from "@b1nd/dodam-design-system";
import { useTeamStore } from "@/features/register-app/stores/team";
import { TOSAT_CONFIG } from "@/shared/constants/toast-config";
import { useUploads } from "@/shared/hooks/useUploads";
import { useRegisterAppMutation } from "@/entities/apps/mutations";

type ServerFields = NonNullable<CreateAppReq["server"]>;
type FormFields = Omit<CreateAppReq, "server">;

export const useForm = () => {
  const { form, setForm } = useFormStore();
  const { checks, setChecks } = useChecksStore();
  const { team, setTeam } = useTeamStore();
  const { icons, setIcons } = useIconsStore();
  const {
    data: {
      data: { data },
    },
  } = useGetTeamsQuery();
  const teamsOption = data.map((team) => ({
    name: team.name,
    value: team.teamId,
  }));
  const toast = useToast();
  const { upload, isLoading } = useUploads();

  const handleField = <K extends keyof FormFields>(
    key: K,
    value: FormFields[K],
  ) => {
    setForm({ ...form, [key]: value });
  };

  const handleServerField = <K extends keyof ServerFields>(
    key: K,
    value: ServerFields[K],
  ) => {
    setForm({
      ...form,
      server: { ...form.server, [key]: value } as ServerFields,
    });
  };

  const handleUseServer = () => {
    setChecks({ ...checks, useServer: !checks.useServer });
  };

  const handleAgree = (index: 0 | 1 | 2) => {
    const agrees = [...checks.agrees] as [boolean, boolean, boolean];
    agrees[index] = !checks.agrees[index];
    setChecks({ ...checks, agrees });
  };

  const handleIcons = (key: "lightMode" | "darkMode", value: File | null) => {
    setIcons({ ...icons, [key]: value });
  };

  const handleTeam = (team: DropdownItem) => {
    setTeam(team);
  };

  const validate = () => {
    const { name, subtitle, githubReleaseUrl } = form;
    if (!name.trim() || !subtitle.trim() || !githubReleaseUrl.trim() || !team)
      return false;
    return true;
  };

  const initForm = () => {
    setForm({
      name: "",
      subtitle: "",
      description: "",
      inquiryMail: "",
      teamId: "",
      darkIconUrl: "",
      iconUrl: "",
      githubReleaseUrl: "",
    });
    setChecks({
      useServer: false,
      agrees: [false, false, false],
    });
    setIcons({
      lightMode: null,
      darkMode: null,
    });
    setTeam(null);
  };

  const { mutateAsync, isPending } = useRegisterAppMutation(initForm);

  const submit = async () => {
    const isValidated = validate();
    if (!isValidated || !icons.lightMode) {
      toast.warning("필수 입력 필드를 모두 채워주세요.", TOSAT_CONFIG);
      return;
    }
    const isAgreed = checks.agrees.every((item) => item);
    if (!isAgreed) {
      toast.warning("이용약관을 모두 확인해주세요.", TOSAT_CONFIG);
      return;
    }
    if (
      checks.useServer &&
      (!form.server?.name.trim() ||
        !form.server.redirectPath.trim() ||
        !form.server.serverAddress.trim())
    ) {
      toast.warning("필수 입력 필드를 모두 채워주세요.", TOSAT_CONFIG);
      return;
    }
    const iconUrl = await upload(icons.lightMode);
    const darkIconUrl = icons.darkMode && (await upload(icons.darkMode));
    if (!iconUrl) return;
    await mutateAsync({
      ...form,
      server: checks.useServer
        ? {
            ...form.server!,
            omitApiPrefix: form.server?.omitApiPrefix || false,
            usePushNotification: form.server?.usePushNotification || false,
          }
        : undefined,
      teamId: team!.value,
      iconUrl,
      darkIconUrl: darkIconUrl || undefined,
    });
  };

  return {
    form,
    handleField,
    handleServerField,
    checks,
    handleUseServer,
    handleAgree,
    icons,
    handleIcons,
    submit,
    teamsOption,
    handleTeam,
    team,
    isProcessing: isLoading || isPending,
  };
};
