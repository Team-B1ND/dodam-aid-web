import { colors, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
`;

export const Label = styled.div`
  ${typoCss("Label", "Medium")}
  color: ${colors.text.tertiary};
  display: flex;
  gap: 4px;
`;

export const RequiredDot = styled.div`
  width: 4px;
  height: 4px;
  background-color: ${colors.status.error};
  border-radius: 1000px;
`;
