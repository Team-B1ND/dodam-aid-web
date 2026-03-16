import { colors, shapes } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Container = styled.div`
  width: 84px;
  height: 84px;
  position: relative;
  overflow: hidden;
  border-radius: ${shapes.small};
`;

export const Icon = styled.img`
  width: 100%;
  height: 100%;
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const Edit = styled(Button)`
  background-color: color-mix(
    in srgb,
    ${colors.brand.primary} 50%,
    transparent
  );
`;

export const Remove = styled(Button)`
  background-color: color-mix(in srgb, ${colors.status.error} 50%, transparent);
`;
