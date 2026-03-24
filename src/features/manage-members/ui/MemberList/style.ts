import { colors, shapes, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const List = styled.div`
  width: 100%;
  border-radius: ${shapes.medium};
  overflow: hidden;
  border: 1px solid ${colors.border.normal};
`;

export const ListHeader = styled.div`
  width: 100%;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ListTitle = styled.div`
  ${typoCss("Body1", "Medium")};
  color: ${colors.text.tertiary};
`;

export const CheckboxWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeightHolder = styled.div`
  height: 40px;
`
