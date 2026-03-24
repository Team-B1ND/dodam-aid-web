import { Column, Row, Spacer } from "@/shared/styles/common";
import * as S from "./style";
import { Dialog, FilledButton, Switch, useOverlay } from "@b1nd/dodam-design-system";
import { useEditOptions } from "@/features/edit-app/hooks/useEditOptions";
import { useEditServer } from "@/features/edit-app/hooks/useEditServer";
import { useDeleteApp } from "@/features/edit-app/hooks/useDeleteApp";

interface Props {
  isEditMode: boolean;
}

const Options = ({ isEditMode }: Props) => {
  const { options, handleOption } = useEditOptions();
  const { server } = useEditServer();
  const { deleteSubmit, isPending } = useDeleteApp();
  const { open } = useOverlay();

  const handleOpenDeleteDialog = () => {
    open(({ close, exit, isOpen }) => (
      <Dialog
        open={isOpen}
        title="앱을 삭제할까요?"
        description="삭제한 앱은 복구할 수 없어요.">
        <Dialog.FilledButton
          onClick={() => {
            close();
            exit();
          }}
          role="assistive">
          취소
        </Dialog.FilledButton>
        <Dialog.FilledButton
          onClick={async () => {
            await deleteSubmit();
            close();
            exit();
          }}
          role="negative">
          삭제
        </Dialog.FilledButton>
      </Dialog>
    ));
  };

  return (
    <Column $gap={24}>
      <Row $align="center">
        <Column $gap={4}>
          <S.Label>API 접두사 생략</S.Label>
          <S.Example>생략 시, /api/user → /user</S.Example>
        </Column>
        <Spacer />
        <Switch
          checked={options.omitApiPrefix && server.useServer}
          onChange={() => handleOption("omitApiPrefix")}
          disabled={!isEditMode}
        />
      </Row>
      <Row $align="center">
        <S.Label>푸시알람 기능 사용</S.Label>
        <Spacer />
        <Switch
          checked={options.usePushNotification && server.useServer}
          onChange={() => handleOption("usePushNotification")}
          disabled={!isEditMode}
        />
      </Row>
      {isEditMode && (
        <FilledButton
          size="small"
          role="negative"
          onClick={handleOpenDeleteDialog}
          disabled={isPending}>
          {isPending ? "앱 삭제 중..." : "앱 삭제하기"}
        </FilledButton>
      )}
    </Column>
  );
};

Options.Skeleton = () => {
  return (
    <Column $gap={24}>
      <Row $align="center">
        <Column $gap={4}>
          <S.Label>API 접두사 생략</S.Label>
          <S.Example>생략 시, /api/user → /user</S.Example>
        </Column>
        <Spacer />
        <Switch checked={false} onChange={() => {}} disabled />
      </Row>
      <Row $align="center">
        <S.Label>푸시알람 기능 사용</S.Label>
        <Spacer />
        <Switch checked={false} onChange={() => {}} disabled />
      </Row>
    </Column>
  );
};

export default Options;
