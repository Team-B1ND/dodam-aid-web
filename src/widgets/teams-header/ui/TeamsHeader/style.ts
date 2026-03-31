import { typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  & > h2 {
    ${typoCss("Title2", "Medium")};
  }
`;
