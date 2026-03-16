import AppInfo from "@/features/get-app-detail/ui/AppInfo";
import { Column } from "@/shared/styles/common";
import AppMenu from "@/widgets/app-menu/ui/AppMenu";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <Column $gap={32}>
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
