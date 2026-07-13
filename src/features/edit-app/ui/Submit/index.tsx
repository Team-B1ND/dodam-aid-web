import { useDeleteApp } from "@/features/edit-app/hooks/useDeleteApp";
import { useSubmit } from "@/features/edit-app/hooks/useSubmit";
import { Row } from "@/shared/styles/common";
import {
  Dialog,
  FilledButton,
  useOverlay,
} from "@b1nd/dodam-design-system";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
}

const Submit = ({ isEditMode, setIsEditMode }: Props) => {
  const { submit, isPending } = useSubmit(() => setIsEditMode(false));
  const { deleteSubmit, isPending: isDeleting } = useDeleteApp();
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
            close();
            exit();
            await deleteSubmit();
          }}
          role="negative">
          삭제
        </Dialog.FilledButton>
      </Dialog>
    ));
  };

  return (
    <Row $gap={8}>
      <FilledButton
        onClick={isEditMode ? submit : () => setIsEditMode(true)}
        disabled={isPending || isDeleting}>
        {isPending ? "수정 중..." : isEditMode ? "수정 완료" : "정보 수정하기"}
      </FilledButton>
      {isEditMode && (
        <FilledButton
          role="negative"
          onClick={handleOpenDeleteDialog}
          disabled={isPending || isDeleting}>
          {isDeleting ? "삭제 중..." : "앱 삭제하기"}
        </FilledButton>
      )}
    </Row>
  );
};

Submit.Skeleton = () => {
  return <FilledButton>정보 수정하기</FilledButton>;
};

export default Submit;
