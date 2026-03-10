import { colors, shapes } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 584px;
  border-radius: ${shapes.large};
  padding: 64px 20px;
  overflow: hidden;
  background: linear-gradient(180deg, #d1eaff 0%, ${colors.brand.primary} 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const Clock = styled.div`
  display: inline-grid;
  grid-template-rows: 40px 40px;
  grid-template-columns: 32px 32px;
`;

export const ClockText = styled.p`
  color: ${colors.static.black};
  font-size: 48px;
  font-weight: 600;
  line-height: 130%;
  letter-spacing: -0.03rem;
  text-align: center;
  font-style: normal;
`;

export const DateText = styled.p`
  color: ${colors.static.black};
  font-size: 11px;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: -0.01rem;
`;

export const Notification = styled.div`
  width: 100%;
  padding: 8px 10px;
  background-color: color-mix(in srgb, ${colors.static.black} 60%, transparent);
  border-radius: ${shapes.large}
`;

export const Logo = styled.img`
  width: 28px;
  height: 28px;
  border-radius: ${shapes.small};
  background-color: ${colors.brand.secondary};
`;

export const AppName = styled.p`
  font-size: 10px;
  font-weight: 500;
  line-height: 130%;
  letter-spacing: -0.01rem;
`;

export const Time = styled.span`
  font-size: 8px;
  font-weight: 200;
  line-height: 130%;
  letter-spacing: 0.03rem;
  color: ${colors.text.inverse};
`;

export const NotificationText = styled.span`
  font-size: 9px;
  font-weight: 300;
  line-height: 130%;
  letter-spacing: 0.03rem;
`;
