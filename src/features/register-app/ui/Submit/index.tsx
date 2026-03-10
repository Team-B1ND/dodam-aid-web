import { Column } from "@/shared/styles/common";
import { FilledButton } from "@b1nd/dodam-design-system";

const Submit = () => {
  return (
    <Column $align="end">
      <FilledButton>
        서비스 검토 요청하기
      </FilledButton>
    </Column>
  );
};

export default Submit;
