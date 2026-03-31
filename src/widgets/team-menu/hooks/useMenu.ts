import { useLocation, useNavigate } from "react-router-dom";

export const useMenu = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const tokens = pathname.split("/");

  const move = (index: number) => {
    navigate(
      `/${tokens[1]}/${tokens[2]}${index === 1 ? "/settings" : index === 2 ? "/members" : ""}`,
    );
  };

  return {
    move,
    isAppsPage: tokens.length === 3,
    isSettingsPage: tokens[3] === "settings",
    isMembersPage: tokens[3] === "members",
  };
};
