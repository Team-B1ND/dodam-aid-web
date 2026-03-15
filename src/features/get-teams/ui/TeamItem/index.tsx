import type { Team } from "@/entities/teams/types";
import * as S from "./style";
import { Column, Row, Skeleton, Spacer } from "@/shared/styles/common";
import { FilledButton, shapes } from "@b1nd/dodam-design-system";
import Role from "@/features/get-teams/ui/Role";

interface Props {
  data: Team;
}

const TeamItem = ({ data }: Props) => {
  return (
    <S.Container to={`/teams/${data.teamId}`}>
      <S.Logo src={data.iconUrl} />
      <Spacer>
        <Column $align="start" $gap={4}>
          <Row $align="center" $gap={8}>
            <S.Name>{data.name}</S.Name>
            <Role isOwner={data.isOwner} />
          </Row>
          <S.Description>{data.description}</S.Description>
        </Column>
      </Spacer>
      <Row $size="fit" $gap={12} $align="center">
        {data.isOwner && (
          <FilledButton role="assistive" size="small">
            설정
          </FilledButton>
        )}
        <FilledButton role="negative" size="small">
          팀 떠나기
        </FilledButton>
      </Row>
    </S.Container>
  );
};

TeamItem.Skeleton = () => {
  return (
    <S.Container to={`/teams`}>
      <Skeleton $width="72px" $height="72px" $radius={shapes.large} />
      <Spacer>
        <Column $align="start" $gap={4}>
          <Skeleton $width="140px" $height="30px" $radius={shapes.large} />
          <Skeleton $width="260px" $height="24px" $radius={shapes.large} />
        </Column>
      </Spacer>
      <Row $size="fit" $gap={12} $align="center">
        <Skeleton $width="48px" $height="32px" $radius={shapes.large} />
        <Skeleton $width="74px" $height="32px" $radius={shapes.large} />
      </Row>
    </S.Container>
  );
};

export default TeamItem;
