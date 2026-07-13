import { useDeleteApp } from "@/features/edit-app/hooks/useDeleteApp";
import { useSubmit } from "@/features/edit-app/hooks/useSubmit";
import { Column, Row } from "@/shared/styles/common";
import {
  Dialog,
  FilledButton,
  FilledTextField,
  useOverlay,
} from "@b1nd/dodam-design-system";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

interface Props {
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
}

interface DeleteDialogProps {
  appName: string;
  deleteSubmit: () => Promise<void>;
  close: () => void;
  exit: () => void;
  isOpen: boolean;
}

const DeleteDialog = ({
  appName,
  deleteSubmit,
  close,
  exit,
  isOpen,
}: DeleteDialogProps) => {
  const [input, setInput] = useState("");
  const isConfirmed = input === appName;

  return (
    <Dialog
      open={isOpen}
      title="앱을 삭제할까요?"
      description={`삭제한 앱은 복구할 수 없어요. 삭제하려면 앱 이름 '${appName}'을 입력해 주세요.`}>
      <Column $gap={16} $align="stretch">
        <FilledTextField
          label="앱 이름"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={appName}
        />
        <Row $gap={8} $align="end">
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
            role="negative"
            disabled={!isConfirmed}>
            삭제
          </Dialog.FilledButton>
        </Row>
      </Column>
    </Dialog>
  );
};

const Submit = ({ isEditMode, setIsEditMode }: Props) => {
  const { submit, isPending } = useSubmit(() => setIsEditMode(false));
  const { deleteSubmit, isPending: isDeleting, appName } = useDeleteApp();
  const { open } = useOverlay();

  const handleOpenDeleteDialog = () => {
    open(({ close, exit, isOpen }) => (
      <DeleteDialog
        appName={appName}
        deleteSubmit={deleteSubmit}
        close={close}
        exit={exit}
        isOpen={isOpen}
      />
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
