import { useAcceptInviteMutation } from "@/entities/teams/mutations";
import { useGetMyInfoQuery } from "@/entities/users/queries";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import * as S from "./style";

const InviteHandler = () => {
  const { code } = useParams<{ code: string }>();
  const { data } = useGetMyInfoQuery();
  const { mutate, isPending } = useAcceptInviteMutation();

  useEffect(() => {
    if (data && code) {
      mutate({ inviteCode: code });
    }
  }, [data, code, mutate]);

  return (
    <S.Container>
      <S.Message>{isPending ? "팀에 참여하는 중..." : "초대를 처리하고 있어요..."}</S.Message>
    </S.Container>
  );
};

const LoginFallback = () => {
  const { code } = useParams<{ code: string }>();

  useEffect(() => {
    const currentUrl = `${window.location.origin}/team/invite/${code}`;
    const loginUrl = import.meta.env.VITE_LOGIN_URL;
    if (loginUrl) {
      window.location.href = `${loginUrl}?redirect=${encodeURIComponent(currentUrl)}`;
    }
  }, [code]);

  return (
    <S.Container>
      <S.Message>팀 수락을 위해서는 로그인을 해야해요.</S.Message>
    </S.Container>
  );
};

const InviteAcceptPage = () => {
  return (
    <ErrorBoundary fallback={<LoginFallback />}>
      <Suspense
        fallback={
          <S.Container>
            <S.Message>로딩 중...</S.Message>
          </S.Container>
        }
      >
        <InviteHandler />
      </Suspense>
    </ErrorBoundary>
  );
};

export default InviteAcceptPage;
