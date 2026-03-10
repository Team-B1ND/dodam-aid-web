import { Column, Row, Spacer } from "@/shared/styles/common";
import * as S from "./style";
import { useGetDateTime } from "@/features/register-app/hooks/useGetDateTime";

const PushScreen = () => {
  const { h1, h2, m1, m2, month, date, day, ampm, displayHours, minutes } =
    useGetDateTime();

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
        <a href="https://dodam.b1nd.com" target="_blank" style={{ width: "100%" }}>
          <S.Notification>
            <Row $align="center" $gap={8}>
              <S.Logo />
              <Spacer>
                <Column>
                  <Row $align="center" $gap={4}>
                    <S.AppName>도담도담</S.AppName>
                    <S.Time>
                      {ampm} {displayHours}:{minutes}
                    </S.Time>
                  </Row>
                  <S.NotificationText>
                    심야자습이 만료됐어요.
                  </S.NotificationText>
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
