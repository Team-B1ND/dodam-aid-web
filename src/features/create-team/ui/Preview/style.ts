import { colors, shapes, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 280px;
  padding: 24px 20px;
  margin-top: 24px;
  border-radius: ${shapes.medium};
  background-color: ${colors.background.surface};
`;

export const Logo = styled.img`
  width: 84px;
  height: 84px;
  border-radius: ${shapes.large};
  background-color: ${colors.background.default};
`;

export const LinkWrap = styled(Link)`
  display: flex;
  gap: 4px;
  align-items: center;
  color: ${colors.status.info};
`;

export const LinkText = styled.p`
  ${typoCss("Label", "Medium")};
  text-decoration: underline;
`;

export const Name = styled.h3`
  ${typoCss("Title2", "Bold")};
`;

export const Description = styled.p`
  ${typoCss("Body1", "Regular")};
  color: ${colors.text.secondary};
`;
