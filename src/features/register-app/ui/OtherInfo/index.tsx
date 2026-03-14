import { Column, Row } from "@/shared/styles/common";
import Section from "@/widgets/section/ui";
import { Checkbox } from "@b1nd/dodam-design-system";
import * as S from "./style";
import { useForm } from "@/features/register-app/hooks/useForm";

const OtherInfo = () => {
  const { form, handleServerField } = useForm();

  return (
    <Section title="기타 설정">
      <Column $gap={16}>
        <Row $gap={8} $align="center">
          <S.CheckBoxWrapper>
            <Checkbox
              selected={form.server?.omitApiPrefix || false}
              onClick={() =>
                handleServerField("omitApiPrefix", !form.server?.omitApiPrefix)
              }
              size="small"
            />
          </S.CheckBoxWrapper>
          <Column>
            <S.TermsText>api 접두사 생략</S.TermsText>
            <S.TermsSubText>생략 시, /api/user → /user</S.TermsSubText>
          </Column>
        </Row>
        <Row $gap={8} $align="center">
          <S.CheckBoxWrapper>
            <Checkbox
              selected={form.server?.usePushNotification || false}
              onClick={() =>
                handleServerField(
                  "usePushNotification",
                  !form.server?.usePushNotification,
                )
              }
              size="small"
            />
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
