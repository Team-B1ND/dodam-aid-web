import { Column, Row } from "@/shared/styles/common";
import { FilledButton } from "@b1nd/dodam-design-system";
import * as S from "./style";

interface Props {
  name?: string;
  teamName?: string;
  subtitle?: string;
  description?: string;
  iconUrl?: string;
}

const EntryScreen = ({
  name,
  teamName,
  subtitle,
  description,
  iconUrl,
}: Props) => {
  return (
    <S.Container>
      <Column $gap={16}>
        <Column $gap={12}>
          <S.Logo src={iconUrl} />
          <Column $gap={2}>
            <S.AppName>{name || "앱 이름"}</S.AppName>
            <S.TeamName>{teamName || "내 팀"}</S.TeamName>
          </Column>
        </Column>
        <Column $gap={4}>
          <S.AppSubName>{subtitle || "앱 부제목"}</S.AppSubName>
          <S.AppDescription>
            {description || "앱 설명이 들어가는 자리입니다."}
          </S.AppDescription>
        </Column>
      </Column>
      <Row>
        <FilledButton size="medium" display="fill">
          서비스 시작하기
        </FilledButton>
      </Row>
    </S.Container>
  );
};

export default EntryScreen;
