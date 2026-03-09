import { Outlet } from "react-router-dom";
import * as S from "./style";

const AppsLayout = () => {
  return (
    <S.Container>
      <Outlet />
    </S.Container>
  );
};

export default AppsLayout;
