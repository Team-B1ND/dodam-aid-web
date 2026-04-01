import type { Member } from "@/entities/users/types";
import * as S from "./style";
import { Avatar, Checkbox, shapes } from "@b1nd/dodam-design-system";
import { Column, Skeleton, Spacer } from "@/shared/styles/common";

interface Props {
  data: Member;
  onClick: () => void;
  isSelected: boolean;
  teamIsOwner: boolean;
}

const MemberItem = ({ data, onClick, isSelected, teamIsOwner }: Props) => {
  return (
    <S.Container>
      <S.CheckboxWrapper>
        {teamIsOwner && !data.isOwner && (
          <Checkbox selected={isSelected} onClick={onClick} size="small" />
        )}
      </S.CheckboxWrapper>
      {data.profileIamge ? (
        <S.ProfileImage src={data.profileIamge} />
      ) : (
        <Avatar size={64} />
      )}
      <Spacer>
        <Column>
          <S.Name>{data.name}</S.Name>
          <S.Role>{data.isOwner ? "Owner" : "Developer"}</S.Role>
        </Column>
      </Spacer>
    </S.Container>
  );
};

MemberItem.Skeleton = () => {
  return (
    <S.Container>
      <Skeleton $width="64px" $height="64px" $radius="9999px" />
      <Spacer>
        <Column $gap={4}>
          <Skeleton $width="48px" $height="24px" $radius={shapes.large} />
          <Skeleton $width="76px" $height="22px" $radius={shapes.large} />
        </Column>
      </Spacer>
    </S.Container>
  );
};

export default MemberItem;
