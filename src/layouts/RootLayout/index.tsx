import Header from "@/widgets/header/ui/Header";
import { Outlet, useLocation } from "react-router-dom";
import * as S from "./style";
import { useEffect } from "react";

const RootLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <S.Container>
      <Header />
      <Outlet />
    </S.Container>
  );
};

export default RootLayout;
