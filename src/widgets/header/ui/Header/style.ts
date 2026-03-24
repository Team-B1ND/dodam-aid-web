import { colors, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Header = styled.header<{ $isScrolled: boolean }>`
  width: 100%;
  max-width: 1200px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  box-sizing: content-box;
  border-bottom: 1px ${({ $isScrolled }) => ($isScrolled ? `solid` : `none`)} ${colors.border.disabled};
  background-color: color-mix(
    in srgb,
    ${colors.background.default} 70%,
    transparent
  );
  z-index: 999;
`;

export const Container = styled.div`
  width: 100%;
  height: 60px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(8px);
`;

export const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const NavItem = styled.div`
  padding: 12px 20px;
  ${typoCss("Body2", "Bold")};
  color: ${colors.text.tertiary};
`;
