import styled from "@emotion/styled";

export const Row = styled.div<{
  $align: "start" | "center" | "end";
  $gap: number;
}>`
  width: 100%;
  display: flex;
  align-items: ${({ $align }) => $align};
  gap: ${({ $gap }) => $gap}px;
`;

export const Column = styled.div<{
  $align: "start" | "center" | "end";
  $gap: number;
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({ $align }) => $align};
  gap: ${({ $gap }) => $gap}px;
`;

export const Spacer = styled.div`
  flex: 1;
`