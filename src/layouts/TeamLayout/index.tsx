import TeamInfo from "@/features/get-team-detail/ui/TeamInfo";
import { Column } from "@/shared/styles/common";
import TeamMenu from "@/widgets/team-menu/ui/TeamMenu";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Navigate, Outlet, useParams } from "react-router-dom";

const TeamLayout = () => {
  const { id } = useParams<{ id?: string }>();

  if (!id) return <Navigate to="/teams" replace />;

  return (
    <ErrorBoundary fallback={<Navigate to="/teams" replace />}>
      <Column $gap={32}>
        <Suspense fallback={<TeamInfo.Skeleton />}>
          <TeamInfo />
        </Suspense>
        <Column $gap={24}>
          <TeamMenu />
          <Outlet />
        </Column>
      </Column>
    </ErrorBoundary>
  );
};

export default TeamLayout;
