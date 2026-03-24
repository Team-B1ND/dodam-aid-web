import AppsHeader from "@/widgets/apps-header/ui/AppsHeader";
import * as S from "./style";
import DefaultInfo from "@/features/register-app/ui/DefaultInfo";
import DetailInfo from "@/features/register-app/ui/DetailInfo";
import HostingInfo from "@/features/register-app/ui/HostingInfo";
import OtherInfo from "@/features/register-app/ui/OtherInfo";
import Terms from "@/features/register-app/ui/Terms";
import Submit from "@/features/register-app/ui/Submit";
import Preview from "@/features/register-app/ui/Preview";
import { useLeaveConfirm } from "@/features/register-app/hooks/useLeaveConfirm";
import { Dialog, useOverlay } from "@b1nd/dodam-design-system";
import { useEffect } from "react";

const RegisterApp = () => {
  const { blocker } = useLeaveConfirm();
  const { open } = useOverlay();

  useEffect(() => {
    if (blocker.state === "blocked")
      open(({ close, exit, isOpen }) => (
        <Dialog
          open={isOpen}
          title="제출하지 않고 나갈까요?"
          description="미제출 정보는 저장되지 않아요.">
          <Dialog.FilledButton
            onClick={() => {
              close();
              exit();
              blocker.reset();
            }}
            role="assistive">
            취소
          </Dialog.FilledButton>
          <Dialog.FilledButton
            onClick={() => {
              close();
              exit();
              blocker.proceed();
            }}>
            확인
          </Dialog.FilledButton>
        </Dialog>
      ));
  }, [blocker.state]);

  return (
    <S.Container>
      <AppsHeader title="애플리케이션 등록" />
      <S.Content>
        <S.Form>
          <DefaultInfo />
          <DetailInfo />
          <HostingInfo />
          <OtherInfo />
          <Terms />
          <Submit />
        </S.Form>
        <Preview />
      </S.Content>
    </S.Container>
  );
};

export default RegisterApp;
