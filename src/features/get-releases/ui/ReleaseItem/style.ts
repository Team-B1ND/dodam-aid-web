import { colors, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  cursor: pointer;
`

export const Date = styled.p`
  ${typoCss("Heading1", "Bold")}
`;

export const User = styled.p`
  ${typoCss("Headline", "Regular")};
  color: ${colors.text.tertiary};
`;