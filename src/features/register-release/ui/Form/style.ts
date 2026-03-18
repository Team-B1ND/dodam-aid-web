import { colors, shapes, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Title = styled.h1`
  ${typoCss("Heading1", "Bold")};
`;

export const Textarea = styled.textarea`
  ${typoCss("Body1", "Regular")};
  width: 100%;
  height: 100px;
  padding: 12px 16px;
  border-radius: ${shapes.medium};
  border: 1px solid ${colors.border.normal};
  background-color: ${colors.background.default};
  color: ${colors.text.primary};
  resize: none;
`;
