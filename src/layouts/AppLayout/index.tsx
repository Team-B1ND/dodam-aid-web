import AppInfo from "@/features/get-app-detail/ui/AppInfo";
import { Column } from "@/shared/styles/common";
import AppMenu from "@/widgets/app-menu/ui/AppMenu";
import { ArrowLeft, colors } from "@b1nd/dodam-design-system";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import * as S from "./style";

const AppLayout = () => {
  const { pathname } = useLocation();
  const tokens = pathname.split("/");

  return (
    <Column $gap={32}>
      <S.Back to={`/${tokens[1]}/${tokens[2]}`}>
        <ArrowLeft size={20} color={colors.brand.primary} />
        <p>애플리케이션 목록</p>
      </S.Back>
      <Suspense fallback={<AppInfo.Skeleton />}>
        <AppInfo />
      </Suspense>
      <Column $gap={24}>
        <AppMenu />
        <Outlet />
      </Column>
    </Column>
  );
};

export default AppLayout;
