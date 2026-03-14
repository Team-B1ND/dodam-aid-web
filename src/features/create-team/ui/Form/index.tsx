import {
  FileInput,
  FilledButton,
  FilledTextField,
} from "@b1nd/dodam-design-system";
import { Column } from "@/shared/styles/common";
import { useForm } from "@/features/create-team/hooks/useForm";

const Form = () => {
  const { form, handleTextForm, logo, handleLogo, submit, isProcessing } =
    useForm();

  return (
    <Column $align="stretch" $gap={28}>
      <FilledTextField
        label="팀 이름"
        type="text"
        placeholder="B1ND"
        required
        value={form.name}
        onChange={handleTextForm}
        name="name"
      />
      <FilledTextField
        label="팀 설명"
        type="text"
        placeholder="스마트스쿨플랫폼 도담도담 개발팀 바인드"
        required
        value={form.description}
        onChange={handleTextForm}
        name="description"
      />
      <FileInput
        label="팀 로고"
        required
        onChange={handleLogo}
        value={logo}
        accept="image/*"
      />
      <FilledTextField
        label="깃허브 URL"
        type="text"
        placeholder="https://github.com/Team-B1ND"
        required
        value={form.githubUrl}
        onChange={handleTextForm}
        name="githubUrl"
      />
      <Column $align="end">
        <FilledButton size="large" onClick={submit} disabled={isProcessing}>
          {isProcessing ? "팀 생성 중..." : "팀 생성하기"}
        </FilledButton>
      </Column>
    </Column>
  );
};

export default Form;
