import { useForm } from "@/features/register-app/hooks/useForm";
import { Column } from "@/shared/styles/common";
import { FilledButton } from "@b1nd/dodam-design-system";

const Submit = () => {
  const { submit } = useForm();

  return (
    <Column $align="end">
      <FilledButton onClick={submit} size="large">
        서비스 검토 요청하기
      </FilledButton>
    </Column>
  );
};

export default Submit;
