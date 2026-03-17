import { colors, shapes, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Icon = styled.img`
  width: 84px;
  height: 84px;
  border-radius: ${shapes.small};
`;

export const IconText = styled.p`
  ${typoCss("Body1", "Regular")};
  color: ${colors.text.tertiary};
`;

export const Value = styled.p`
  ${typoCss("Body1", "Bold")};
`;
