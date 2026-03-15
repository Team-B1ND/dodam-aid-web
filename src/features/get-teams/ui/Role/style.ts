import { colors, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 4px 12px;
  border: 1px solid ${colors.border.normal};
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 999px;
`;

export const Text = styled.p`
  ${typoCss("Caption2", "Regular")};
  color: ${colors.text.tertiary};
`;
