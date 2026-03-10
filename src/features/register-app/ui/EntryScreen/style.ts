import { colors, shapes, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 584px;
  border-radius: ${shapes.large};
  padding: 28px 20px;
  overflow: hidden;
  background-color: ${colors.background.surface};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
`;

export const Logo = styled.img`
  width: 84px;
  height: 84px;
  background-color: ${colors.background.default};
  border-radius: ${shapes.large};
`;

export const AppName = styled.p`
  ${typoCss("Heading1", "Bold")};
`;

export const TeamName = styled.p`
  ${typoCss("Caption1", "Bold")};
  color: ${colors.brand.primary};
`;

export const AppSubName = styled.p`
  ${typoCss("Body2", "Bold")};
`

export const AppDescription = styled.p`
  ${typoCss("Label", "Medium")};
  color: ${colors.text.secondary};
`