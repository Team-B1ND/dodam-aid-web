import { useDateTime } from "@/widgets/app-preview/hooks/useDateTime";
import { Column, Row, Spacer } from "@/shared/styles/common";
import { useTheme } from "@b1nd/dodam-design-system";
import AppLogo from "@/shared/assets/images/AppIcon.png";
import * as S from "./style";

interface Props {
  name?: string;
  subtitle?: string;
  iconUrl?: string;
  darkIconUrl?: string;
  pushLink?: string;
  enablePushLink?: boolean;
}

const PushScreen = ({
  name,
  subtitle,
  iconUrl,
  darkIconUrl,
  pushLink = "https://dodam.b1nd.com",
  enablePushLink = false,
}: Props) => {
  const { h1, h2, m1, m2, month, date, day, ampm, displayHours, minutes } =
    useDateTime();
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
          href={pushLink}
          target="_blank"
          style={{
            width: "100%",
            pointerEvents: enablePushLink ? "auto" : "none",
          }}>
          <S.Notification>
            <Row $align="center" $gap={8}>
              <S.Logo
                src={AppLogo}
              />
              <Spacer>
                <Column>
                  <Row $align="center" $gap={4}>
                    <S.AppName>{name || "앱 이름"}</S.AppName>
                    <S.Time>
                      {ampm} {displayHours}:{minutes}
                    </S.Time>
                  </Row>
                  <S.NotificationText>{subtitle}</S.NotificationText>
                </Column>
              </Spacer>
              <S.MiniAppLogo
                src={theme === "dark" && darkIconUrl ? darkIconUrl : iconUrl}
              />
            </Row>
          </S.Notification>
        </a>
      </Column>
    </S.Container>
  );
};

export default PushScreen;
