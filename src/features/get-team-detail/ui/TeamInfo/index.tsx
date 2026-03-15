import { Column, Row, Skeleton, Spacer } from "@/shared/styles/common";
import * as S from "./style";
import { useGetTeamDetail } from "@/features/get-team-detail/hooks/useGetTeamDetail";
import { useGetMembers } from "@/features/get-team-detail/hooks/useGetMembers";
import { useGetAppsInTeam } from "@/features/get-apps/hooks/useGetAppsInTeam";
import { shapes } from "@b1nd/dodam-design-system";

const TeamInfo = () => {
  const team = useGetTeamDetail();
  const members = useGetMembers();
  const apps = useGetAppsInTeam();

  return (
    <Row $align="center" $gap={24}>
      <S.Logo src={team.iconUrl} />
      <Spacer>
        <Column $gap={4}>
          <S.Name>{team.name}</S.Name>
          <S.Info>{team.description}</S.Info>
        </Column>
      </Spacer>
      <Column $size="fit" $align="end">
        <S.Info>{members.length} members</S.Info>
        <S.Info>{apps.length} apps</S.Info>
      </Column>
    </Row>
  );
};

TeamInfo.Skeleton = () => {
  return (
    <Row $align="center" $gap={24}>
      <Skeleton $width="108px" $height="108px" $radius={shapes.large} />
      <Spacer>
        <Column $gap={4}>
          <Skeleton $width="88px" $height="47px" $radius={shapes.large} />
          <Skeleton $width="280px" $height="27px" $radius={shapes.large} />
        </Column>
      </Spacer>
      <Column $size="fit" $gap={4} $align="end">
        <Skeleton $width="92px" $height="26px" $radius={shapes.large} />
        <Skeleton $width="56px" $height="26px" $radius={shapes.large} />
      </Column>
    </Row>
  );
};

export default TeamInfo;
