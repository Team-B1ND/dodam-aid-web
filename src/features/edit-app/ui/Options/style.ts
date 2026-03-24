import { colors, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Label = styled.p`
  ${typoCss("Label", "Medium")};
`;

export const Example = styled.p`
  ${typoCss("Caption1", "Regular")};
  color: ${colors.text.tertiary};
`