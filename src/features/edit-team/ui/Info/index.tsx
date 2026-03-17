import { Column, Skeleton } from "@/shared/styles/common";
import WithLabel from "@/widgets/with-label/ui";
import * as S from "./style";
import { useGetTeamDetail } from "@/features/get-team-detail/hooks/useGetTeamDetail";
import { FilledButton, shapes } from "@b1nd/dodam-design-system";

interface Props {
  turnToEditMode: () => void;
}

const Info = ({ turnToEditMode }: Props) => {
  const team = useGetTeamDetail();

  return (
    <Column $gap={24}>
      <FilledButton onClick={turnToEditMode}>정보 수정하기</FilledButton>
      <WithLabel label="팀 로고">
        <S.Icon src={team.iconUrl || undefined} />
      </WithLabel>
      <WithLabel label="팀 이름">
        <S.Value>{team.name}</S.Value>
      </WithLabel>
      <WithLabel label="팀 설명">
        <S.Value>{team.description}</S.Value>
      </WithLabel>
      <WithLabel label="깃허브 주소">
        <S.Value>{team.githubUrl}</S.Value>
      </WithLabel>
    </Column>
  );
};

Info.Skeleton = () => {
  return (
    <Column $gap={24}>
      <FilledButton onClick={() => {}}>정보 수정하기</FilledButton>
      <WithLabel label="팀 로고">
        <Skeleton $height="84px" $width="84px" $radius={shapes.small} />
      </WithLabel>
      <WithLabel label="팀 이름">
        <Skeleton $width="120px" $height="24px" $radius={shapes.small} />
      </WithLabel>
      <WithLabel label="팀 설명">
        <Skeleton $width="240px" $height="24px" $radius={shapes.small} />
      </WithLabel>
      <WithLabel label="깃허브 주소">
        <Skeleton $width="240px" $height="24px" $radius={shapes.small} />
      </WithLabel>
    </Column>
  );
};

export default Info;
