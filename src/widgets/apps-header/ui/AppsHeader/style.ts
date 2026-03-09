import { colors, shapes, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > h2 {
    ${typoCss("Title2", "Medium")};
  }
`;

export const PopupContainer = styled(Container)`
  width: auto;
  & > h2 {
    ${typoCss("Headline", "Medium")};
    margin-left: 8px;
  }
  gap: 16px;
  position: fixed;
  bottom: 48px;
  left: 50%;
  background-color: color-mix(
    in srgb,
    ${colors.background.surface} 50%,
    transparent
  );
  backdrop-filter: blur(10px);
  border-radius: ${shapes.large};
  padding: 16px;
`;
