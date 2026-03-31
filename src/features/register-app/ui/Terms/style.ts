import { colors, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

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

export const Docs = styled(Link)`
  font: inherit;
  color: ${colors.status.info};
  text-decoration: underline;
`