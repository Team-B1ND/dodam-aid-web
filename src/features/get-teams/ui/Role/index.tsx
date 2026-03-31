import { colors, Crown } from "@b1nd/dodam-design-system";
import * as S from "./style";

interface Props {
  isOwner: boolean;
}

const Role = ({ isOwner }: Props) => {
  return (
    <S.Container>
      {isOwner && <Crown color={colors.status.warning} size={16} />}
      <S.Text>{isOwner ? "Owner" : "Developer"}</S.Text>
    </S.Container>
  );
};

export default Role;
