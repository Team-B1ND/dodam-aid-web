import { colors } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Row = styled.div<{
  $align?: "start" | "center" | "end" | "stretch";
  $gap?: number;
  $size?: "full" | "fit";
}>`
  width: ${({ $size = "full" }) => ($size === "full" ? "100%" : "auto")};
  display: flex;
  align-items: ${({ $align = "start" }) => $align};
  gap: ${({ $gap = 0 }) => $gap}px;
`;

export const Column = styled.div<{
  $align?: "start" | "center" | "end" | "stretch";
  $gap?: number;
  $size?: "full" | "fit";
}>`
  width: ${({ $size = "full" }) => ($size === "full" ? "100%" : "auto")};
  display: flex;
  flex-direction: column;
  align-items: ${({ $align = "start" }) => $align};
  gap: ${({ $gap = 0 }) => $gap}px;
`;

export const Spacer = styled.div<{ $size?: "full" | "fit" }>`
  width: ${({ $size = "full" }) => ($size === "full" ? "100%" : "auto")};
  flex: 1;
`;

export const Skeleton = styled.div<{
  $width: string;
  $height: string;
  $radius: string;
}>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: ${({ $radius }) => $radius};
  background-color: ${colors.border.disabled};
`;
