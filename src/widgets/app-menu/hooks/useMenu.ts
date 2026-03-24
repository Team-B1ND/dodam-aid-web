import { useLocation, useNavigate } from "react-router-dom";

export const useMenu = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const tokens = pathname.split("/");

  const move = (index: number) => {
    navigate(
      `/${tokens[0]}/${tokens[1]}/${tokens[2]}/${tokens[3]}/${tokens[4]}${index === 1 ? "/releases" : index === 2 ? "/openapi" : ""}`,
    );
  };

  return {
    move,
    isInfoPage: tokens.length === 5,
    isReleasesPage: tokens[5] === "releases",
    isOpenapiPage: tokens[5] === "openapi",
  };
};
