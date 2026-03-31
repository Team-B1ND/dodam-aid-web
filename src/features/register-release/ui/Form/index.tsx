import { Column } from "@/shared/styles/common";
import * as S from "./style";
import { FilledButton, FilledTextField } from "@b1nd/dodam-design-system";
import WithLabel from "@/widgets/with-label/ui";
import { useRegisterRelease } from "@/features/register-release/hooks/useRegisterRelease";

const Form = () => {
  const { isPending, memo, releaseUrl, setMemo, setReleaseUrl, submit } =
    useRegisterRelease();

  return (
    <Column $gap={24} $align="stretch">
      <S.Title>신규 릴리즈 등록</S.Title>
      <FilledTextField
        label="깃허브 신규 릴리즈 주소"
        required
        type="text"
        value={releaseUrl}
        onChange={(e) => setReleaseUrl(e.target.value)}
        placeholder="https://github.com/Team-B1ND/dodam-framework/releases/tag/1.2.3"
      />
      <WithLabel label="메모">
        <S.Textarea
          placeholder="작성하기"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
      </WithLabel>
      <Column $align="end">
        <FilledButton size="medium" onClick={submit} disabled={isPending}>
          {isPending ? "등록 중..." : "등록하기"}
        </FilledButton>
      </Column>
    </Column>
  );
};

export default Form;
