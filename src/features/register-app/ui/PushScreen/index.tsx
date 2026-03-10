import { Column, Row, Spacer } from "@/shared/styles/common";
import * as S from "./style";

const PushScreen = () => {
  return (
    <S.Container>
      <Column $align="center" $gap={16}>
        <Column $align="center" $gap={16}>
          <S.Clock>
            <S.ClockText>1</S.ClockText>
            <S.ClockText>1</S.ClockText>
            <S.ClockText>4</S.ClockText>
            <S.ClockText>8</S.ClockText>
          </S.Clock>
          <S.DateText>3월 3일 화요일</S.DateText>
        </Column>
        <S.Notification>
          <Row $align="center" $gap={8}>
            <S.Logo />
            <Spacer>
              <Column>
                <Row $align="center" $gap={4}>
                  <S.AppName>도담도담</S.AppName>
                  <S.Time>오전 11:20</S.Time>
                </Row>
                <S.NotificationText>심야자습이 만료됐어요.</S.NotificationText>
              </Column>
            </Spacer>
          </Row>
        </S.Notification>
      </Column>
    </S.Container>
  );
};

export default PushScreen;
