import { Outlet } from "react-router-dom";
import * as S from "./style";

const ServiceLayout = () => {
  return (
    <S.Container>
      <Outlet />
    </S.Container>
  );
};

export default ServiceLayout;
