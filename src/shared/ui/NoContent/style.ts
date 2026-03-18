import { colors, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Text = styled.div`
  width: 100%;
  text-align: center;
  color: ${colors.text.disabled};
  ${typoCss("Body1", "Medium")};
  padding: 32px 0px;
`;
