import { Column, Row, Spacer } from "@/shared/styles/common";
import * as S from "./style";
import { useGetDateTime } from "@/features/register-app/hooks/useGetDateTime";
import { useForm } from "@/features/register-app/hooks/useForm";
import { useFileToImage } from "@/shared/hooks/useFileToImage";
import { useTheme } from "@b1nd/dodam-design-system";
import { useMemo } from "react";

const PushScreen = () => {
  const { h1, h2, m1, m2, month, date, day, ampm, displayHours, minutes } =
    useGetDateTime();
  const { form, icons } = useForm();
  const files = useMemo(
    () => [icons.lightMode, icons.darkMode] as const,
    [icons.lightMode, icons.darkMode],
  );
  const previews = useFileToImage(files);
  const theme = useTheme();

  return (
    <S.Container>
      <Column $align="center" $gap={16}>
        <S.Clock>
          <S.ClockText>{h1}</S.ClockText>
          <S.ClockText>{h2}</S.ClockText>
          <S.ClockText>{m1}</S.ClockText>
          <S.ClockText>{m2}</S.ClockText>
        </S.Clock>
        <S.DateText>
          {month}월 {date}일 {day}
        </S.DateText>
        <a
          href="https://dodam.b1nd.com"
          target="_blank"
          style={{
            width: "100%",
            pointerEvents: form.name === "도담도담" ? "auto" : "none",
          }}>
          <S.Notification>
            <Row $align="center" $gap={8}>
              <S.Logo src={theme === "light" ? previews[0] : previews[1]} />
              <Spacer>
                <Column>
                  <Row $align="center" $gap={4}>
                    <S.AppName>{form.name || "앱 이름"}</S.AppName>
                    <S.Time>
                      {ampm} {displayHours}:{minutes}
                    </S.Time>
                  </Row>
                  <S.NotificationText>{form.subtitle}</S.NotificationText>
                </Column>
              </Spacer>
            </Row>
          </S.Notification>
        </a>
      </Column>
    </S.Container>
  );
};

export default PushScreen;
