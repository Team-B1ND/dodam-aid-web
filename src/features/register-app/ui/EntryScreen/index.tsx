import { Column, Row } from "@/shared/styles/common";
import * as S from "./style";
import { FilledButton } from "@b1nd/dodam-design-system";

const EntryScreen = () => {
  return (
    <S.Container>
      <Column $gap={16}>
        <Column $gap={12}>
          <S.Logo />
          <Column $gap={2}>
            <S.AppName>도담도담</S.AppName>
            <S.TeamName>B1ND</S.TeamName>
          </Column>
        </Column>
        <Column $gap={4}>
          <S.AppSubName>스마트 스쿨 플랫폼, 도담도담!</S.AppSubName>
          <S.AppDescription>
            도담도담은 대구 소프트웨어 마이스터고등학교의 스마트 스쿨 플랫폼으로
            학생 생활 전반에서 함께합니다.
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
