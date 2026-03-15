import { useForm } from "@/features/register-app/hooks/useForm";
import { Column } from "@/shared/styles/common";
import { FilledButton } from "@b1nd/dodam-design-system";

const Submit = () => {
  const { submit, isProcessing } = useForm();

  return (
    <Column $align="end">
      <FilledButton onClick={submit} size="large" disabled={isProcessing}>
        {isProcessing ? "검토 요청 중..." : "서비스 검토 요청하기"}
      </FilledButton>
    </Column>
  );
};

export default Submit;
