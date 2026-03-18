import { useDefaultInfoStore } from "@/features/register-app/stores/default-info";
import { useGetTeamsQuery } from "@/entities/teams/queries";
import type { DropdownItem } from "@b1nd/dodam-design-system";
import type { ChangeEvent } from "react";

export const useDefaultInfo = () => {
  const { defaultInfo, setDefaultInfo } = useDefaultInfoStore();

  const {
    data: {
      data: { data },
    },
  } = useGetTeamsQuery();

  const teamsOption = data.map((item) => ({
    name: item.name,
    value: item.teamId,
  }));

  const handleTextForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDefaultInfo({ ...defaultInfo, [name]: value });
  };

  const handleIcon = async (name: "lightMode" | "darkMode", value: File | null) => {
    setDefaultInfo({
      ...defaultInfo,
      icons: {
        ...defaultInfo.icons,
        [name]: value,
      },
    });
  };

  const handleTeam = (team: DropdownItem) => {
    setDefaultInfo({ ...defaultInfo, team });
  };

  return {
    defaultInfo,
    teamsOption,
    handleTextForm,
    handleIcon,
    handleTeam,
  };
};
