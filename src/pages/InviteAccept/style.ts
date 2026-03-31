import { colors } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.background.default};
`;

export const Message = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: ${colors.text.secondary};
`;
