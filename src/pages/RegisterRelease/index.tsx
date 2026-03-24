import Form from "@/features/register-release/ui/Form";
import { Column } from "@/shared/styles/common";
import * as S from "./style";
import { ArrowLeft, colors } from "@b1nd/dodam-design-system";
import { useParams } from "react-router-dom";

const RegisterReleasePage = () => {
  const { id, appId } = useParams<{ id: string; appId: string }>();

  return (
    <Column $gap={12}>
      <S.Back to={`/teams/${id}/apps/${appId}/releases`}>
        <ArrowLeft size={20} color={colors.brand.primary} />
        <p>릴리즈 목록</p>
      </S.Back>
      <Form />
    </Column>
  );
};

export default RegisterReleasePage;
