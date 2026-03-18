import { colors, shapes, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";
import { markdownStyle } from "@/shared/styles/markdown";

export const ContentBox = styled.div`
  width: 100%;
  padding: 16px 20px;
  border-radius: ${shapes.medium};
  background-color: ${colors.background.surface};
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Content = styled.pre`
  width: 100%;
  white-space: pre-wrap;
  ${typoCss("Body1", "Medium")};
`;

export const MarkdownContent = styled.div`
  width: 100%;
  ${markdownStyle}
`;
