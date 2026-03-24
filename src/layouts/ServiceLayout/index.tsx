import { Navigate, Outlet } from "react-router-dom";
import * as S from "./style";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import AuthGuard from "@/features/check-auth/ui/AuthGuard";

const ServiceLayout = () => {
  return (
    <ErrorBoundary fallback={<Navigate to="/" replace />}>
      <Suspense>
        <AuthGuard />
        <S.Container>
          <Outlet />
        </S.Container>
      </Suspense>
    </ErrorBoundary>
  );
};

export default ServiceLayout;
