import Header from "@/widgets/header/ui/Header";
import { Outlet } from "react-router-dom";
import * as S from "./style";

const RootLayout = () => {
  return (
    <S.Container>
      <Header />
      <Outlet />
    </S.Container>
  );
};

export default RootLayout;
