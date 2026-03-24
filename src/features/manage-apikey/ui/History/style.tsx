import { colors, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const TableRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors.border.normal};
`;

const TableItem = styled.div<{ $width: string }>`
  max-width: ${({ $width }) => $width};
  flex: 1;
  padding: 0px 12px;
  display: flex;
  align-items: center;
`;

export const HeaderItem = styled(TableItem)`
  height: 32px;
  ${typoCss("Caption1", "Medium")};
  color: ${colors.text.secondary};
`;

export const BodyItem = styled(TableItem)`
  height: 40px;
  ${typoCss("Body1", "Bold")};
`;
