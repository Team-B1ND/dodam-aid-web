import { Column, Row } from "@/shared/styles/common";
import Section from "@/widgets/section/ui";
import { Checkbox } from "@b1nd/dodam-design-system";
import * as S from "./style";

const OtherInfo = () => {
  return (
    <Section title="기타 설정">
      <Column $gap={16}>
        <Row $gap={8}>
          <S.CheckBoxWrapper>
            <Checkbox selected onClick={() => {}} size="small" />
          </S.CheckBoxWrapper>
          <Column>
            <S.TermsText>api 접두사 생략</S.TermsText>
            <S.TermsSubText>생략 시, /api/user → /user</S.TermsSubText>
          </Column>
        </Row>
        <Row $gap={8}>
          <S.CheckBoxWrapper>
            <Checkbox selected onClick={() => {}} size="small" />
          </S.CheckBoxWrapper>
          <Column>
            <S.TermsText>푸시알림 기능 사용</S.TermsText>
          </Column>
        </Row>
      </Column>
    </Section>
  );
};

export default OtherInfo;
