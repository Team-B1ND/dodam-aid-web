import { colors, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Back = styled(Link)`
  ${typoCss("Headline", "Regular")};
  color: ${colors.brand.primary};
  display: flex;
  gap: 8px;
  align-items: center;
`;
