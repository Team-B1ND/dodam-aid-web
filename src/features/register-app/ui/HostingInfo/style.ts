import { colors, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const SwitchPrefixWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  align-items: center;
`

export const Label = styled.span`
  ${typoCss("Heading2", "Medium")};
  color: ${colors.text.tertiary}
`