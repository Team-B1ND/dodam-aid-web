import { colors, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  padding: 20px 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-top: 1px solid ${colors.border.normal};
`;

export const ProfileImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 9999px;
`;

export const CheckboxWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Name = styled.p`
  ${typoCss("Headline", "Bold")}
`;

export const Role = styled.p`
  ${typoCss("Body1", "Regular")};
  color: ${colors.text.tertiary};
`;
