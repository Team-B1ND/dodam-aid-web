import { Column, Row, Spacer } from "@/shared/styles/common";
import Section from "@/widgets/section/ui";
import { Switch } from "@b1nd/dodam-design-system";
import * as S from "./style";
import { useOtherInfo } from "@/features/register-app/hooks/useOtherInfo";

const OtherInfo = () => {
  const { otherInfo, handleOption } = useOtherInfo();

  return (
    <Section title="기타 설정">
      <Row $gap={28} $align="center">
        <Spacer>
          <Row $gap={8} $align="center">
            <Column $size="fit">
              <S.TermsText>api 접두사 생략</S.TermsText>
              <S.TermsSubText>생략 시, /api/user → /user</S.TermsSubText>
            </Column>
            <Spacer />
            <Switch
              checked={otherInfo.omitApiPrefix}
              onChange={() => handleOption("omitApiPrefix")}
              size="small"
            />
          </Row>
        </Spacer>
        <Spacer>
          <Row $gap={8} $align="center">
            <Column $size="fit">
              <S.TermsText>푸시알림 기능 사용</S.TermsText>
            </Column>
            <Spacer />
            <Switch
              checked={otherInfo.usePushNotification}
              onChange={() => handleOption("usePushNotification")}
              size="small"
            />
          </Row>
        </Spacer>
      </Row>
    </Section>
  );
};

export default OtherInfo;
