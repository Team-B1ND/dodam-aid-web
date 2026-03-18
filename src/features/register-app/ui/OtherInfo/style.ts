import { colors, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const TermsText = styled.p`
  ${typoCss("Heading2", "Medium")};
`;

export const TermsSubText = styled.p`
  ${typoCss("Label", "Medium")};
  color: ${colors.text.tertiary};
`;
