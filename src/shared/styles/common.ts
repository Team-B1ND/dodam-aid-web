import styled from "@emotion/styled";

export const Row = styled.div<{
  $align?: "start" | "center" | "end" | "stretch";
  $gap?: number;
}>`
  width: 100%;
  display: flex;
  align-items: ${({ $align = "start" }) => $align};
  gap: ${({ $gap = 0 }) => $gap}px;
`;

export const Column = styled.div<{
  $align?: "start" | "center" | "end" | "stretch";
  $gap?: number;
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({ $align = "start" }) => $align};
  gap: ${({ $gap = 0 }) => $gap}px;
`;

export const Spacer = styled.div`
  width: 100%;
  flex: 1;
`;
