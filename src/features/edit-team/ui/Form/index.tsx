import { useEditTeam } from "@/features/edit-team/hooks/useEditTeam";
import SelectIcon from "@/features/edit-team/ui/SelectIcon";
import { Column, Row } from "@/shared/styles/common";
import WithLabel from "@/widgets/with-label/ui";
import {
  Dialog,
  FilledButton,
  FilledTextField,
  useOverlay,
} from "@b1nd/dodam-design-system";

interface Props {
  turnToReadMode: () => void;
}

const Form = ({ turnToReadMode }: Props) => {
  const {
    form,
    handleIcon,
    handleTextForm,
    isLoading,
    isUpdating,
    updateSubmit,
    deleteSubmit,
    isDeleting,
  } = useEditTeam(turnToReadMode);
  const { open } = useOverlay();

  const handleOpenDeleteDialog = () => {
    open(({ close, exit, isOpen }) => (
      <Dialog
        open={isOpen}
        title="팀을 삭제할까요?"
        description="삭제한 팀은 복구할 수 없어요.">
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
    <Column $gap={24} $align="stretch">
      <Row>
        <FilledButton
          onClick={updateSubmit}
          disabled={isLoading || isUpdating || isDeleting}>
          {isUpdating ? "수정 중..." : "수정 완료"}
        </FilledButton>
      </Row>
      <WithLabel label="팀 로고">
        <SelectIcon
          onChange={handleIcon}
          isLoading={isLoading}
          value={form.iconUrl}
        />
      </WithLabel>
      <FilledTextField
        value={form.name}
        name="name"
        onChange={handleTextForm}
        type="text"
        label="팀 이름"
        placeholder="팀 이름을 입력해 주세요."
        required
      />
      <FilledTextField
        value={form.description}
        name="description"
        onChange={handleTextForm}
        type="text"
        label="팀 설명"
        placeholder="팀 설명을 입력해 주세요."
        required
      />
      <FilledTextField
        value={form.githubUrl}
        name="githubUrl"
        onChange={handleTextForm}
        type="text"
        label="깃허브 주소"
        placeholder="깃허브 주소를 입력해 주세요."
        required
      />
      <Row>
        <FilledButton
          role="negative"
          size="small"
          onClick={handleOpenDeleteDialog}
          disabled={isLoading || isDeleting || isUpdating}>
          {isDeleting ? "삭제 중..." : "팀 삭제하기"}
        </FilledButton>
      </Row>
    </Column>
  );
};

export default Form;
