import { colors, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const CheckBoxWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TermsText = styled.p`
  ${typoCss("Heading2", "Medium")};
`;

export const TermsSubText = styled.p`
  ${typoCss("Label", "Medium")};
  color: ${colors.text.tertiary};
`;
