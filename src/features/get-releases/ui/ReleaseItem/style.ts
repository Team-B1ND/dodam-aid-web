import { colors, shapes, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  cursor: pointer;
`

export const Date = styled.p`
  ${typoCss("Heading1", "Bold")}
`;

export const User = styled.p`
  ${typoCss("Headline", "Regular")};
  color: ${colors.text.tertiary};
`;

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