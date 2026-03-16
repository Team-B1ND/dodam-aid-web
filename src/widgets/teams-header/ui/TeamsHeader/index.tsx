import { colors, FilledButton, Plus } from "@b1nd/dodam-design-system";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";
import Username from "@/features/get-my-info/ui/Username";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  showUsername?: boolean;
  title: string;
  showCta?: boolean;
}

const TeamsHeader = ({
  showUsername = false,
  title,
  showCta = false,
}: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/teams/create");
  };

  return (
    <S.Container>
      <h2>
        {showUsername && (
          <ErrorBoundary fallback={<Username.Skeleton />}>
            <Suspense fallback={<Username.Skeleton />}>
              <Username />
            </Suspense>
          </ErrorBoundary>
        )}
        {title}
      </h2>
      {showCta && (
        <FilledButton size="medium" onClick={handleClick}>
          <Plus size={18} color={colors.static.white} />
          <p style={{ marginLeft: 4 }}>팀 생성하기</p>
        </FilledButton>
      )}
    </S.Container>
  );
};

export default TeamsHeader;
