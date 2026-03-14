import { colors, FilledButton, Plus } from "@b1nd/dodam-design-system";
import * as S from "./style";
import { useNavigate } from "react-router-dom";

interface Props {
  username?: string;
  title: string;
  showCta?: boolean;
}

const TeamsHeader = ({ username, title, showCta = false }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/teams/create");
  };

  return (
    <S.Container>
      <h2>
        <S.Name>{username}</S.Name>
        {title}
      </h2>
      {showCta && (
        <FilledButton size="medium" onClick={handleClick}>
          <Plus size={18} color={colors.text.primary} />
          <p style={{ marginLeft: 4 }}>팀 생성하기</p>
        </FilledButton>
      )}
    </S.Container>
  );
};

export default TeamsHeader;
