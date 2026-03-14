import { colors, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > h2 {
    ${typoCss("Title2", "Medium")};
  }
`;

export const Name = styled.span`
  ${typoCss("Title2", "Medium")};
  color: ${colors.brand.primary};
`;
