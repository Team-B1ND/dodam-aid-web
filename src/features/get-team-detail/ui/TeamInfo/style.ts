import { shapes, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Logo = styled.img`
  width: 108px;
  height: 108px;
  border-radius: ${shapes.large};
`;

export const Name = styled.h1`
  ${typoCss("Title1", "Bold")};
`;

export const Info = styled.p`
  ${typoCss("Headline", "Regular")};
`;
