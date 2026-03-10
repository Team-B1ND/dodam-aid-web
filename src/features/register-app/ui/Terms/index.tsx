import { Column, Row } from "@/shared/styles/common";
import Section from "@/widgets/section/ui";
import * as S from "./style";
import { Checkbox } from "@b1nd/dodam-design-system";

const Terms = () => {
  return (
    <Section
      title="마지막으로, 아래 내용을 꼭 확인해 주세요."
      titleSize="small">
      <Column $gap={16}>
        <Row $gap={8} $align="center">
          <S.CheckBoxWrapper>
            <Checkbox selected onClick={() => {}} size="small" />
          </S.CheckBoxWrapper>
          <Column>
            <S.TermsText>
              앱인도담 <S.Docs to="/docs">미니앱 등록 규칙</S.Docs>을
              준수했어요.
            </S.TermsText>
          </Column>
        </Row>
        <Row $gap={8} $align="center">
          <S.CheckBoxWrapper>
            <Checkbox selected onClick={() => {}} size="small" />
          </S.CheckBoxWrapper>
          <Column>
            <S.TermsText>
              미니앱 등록이 거절될 경우 재심사를 받아야 해요.
            </S.TermsText>
          </Column>
        </Row>
        <Row $gap={8} $align="center">
          <S.CheckBoxWrapper>
            <Checkbox selected onClick={() => {}} size="small" />
          </S.CheckBoxWrapper>
          <Column>
            <S.TermsText>
              앱인도담 <S.Docs to="/docs">미니앱 운영 규칙</S.Docs>에 의해 고지
              없이 서비스가 중단될 수 있어요.
            </S.TermsText>
          </Column>
        </Row>
      </Column>
    </Section>
  );
};

export default Terms;
