import { useLocation, useNavigate } from "react-router-dom";

export const useMenu = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const tokens = pathname.split("/");

  const move = (index: number) => {
    navigate(
      `/${tokens[1]}/${tokens[2]}/${tokens[3]}${index === 1 ? "/releases" : index === 2 ? "/settings" : index === 3 ? "/openapi" : ""}`,
    );
  };

  return {
    move,
    isInfoPage: tokens.length === 4,
    isReleasesPage: tokens[4] === "releases",
    isSettingsPage: tokens[4] === "settings",
    isOpenapiPage: tokens[4] === "openapi",
  };
};
