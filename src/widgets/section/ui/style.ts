import { colors, shapes, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Section = styled.section`
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  background-color: ${colors.background.surface};
  border-radius: ${shapes.large};
  & > h3 {
    ${typoCss("Heading2", "Bold")};
    color: ${colors.text.secondary};
  }
  & > div {
    width: 100%;
  }
`;
