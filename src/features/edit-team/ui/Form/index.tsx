import { useEditTeam } from "@/features/edit-team/hooks/useEditTeam";
import SelectIcon from "@/features/edit-team/ui/SelectIcon";
import { Column, Row } from "@/shared/styles/common";
import WithLabel from "@/widgets/with-label/ui";
import { FilledButton, FilledTextField } from "@b1nd/dodam-design-system";

interface Props {
  turnToReadMode: () => void;
}

const Form = ({ turnToReadMode }: Props) => {
  const { form, handleIcon, handleTextForm, isLoading, isPending, submit } =
    useEditTeam(turnToReadMode);

  return (
    <Column $gap={24} $align="stretch">
      <Row>
        <FilledButton onClick={submit} disabled={isLoading || isPending}>
          {isPending ? "수정 중..." : "수정 완료"}
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
          onClick={submit}
          disabled={isLoading || isPending}>
          {isPending ? "삭제 중..." : "팀 삭제하기"}
        </FilledButton>
      </Row>
    </Column>
  );
};

export default Form;
