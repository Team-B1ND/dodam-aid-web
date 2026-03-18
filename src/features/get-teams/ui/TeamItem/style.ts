import { colors, shapes, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Container = styled.button`
  width: 100%;
  background-color: ${colors.background.surface};
  border-radius: ${shapes.extraLarge};
  padding: 12px 24px 12px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Logo = styled.img`
  width: 72px;
  height: 72px;
  border-radius: ${shapes.large};
`;

export const Name = styled.p`
  ${typoCss("Heading1", "Medium")};
  color: ${colors.text.primary};
`;

export const Description = styled.p`
  ${typoCss("Body1", "Regular")};
  color: ${colors.text.secondary};
`;
