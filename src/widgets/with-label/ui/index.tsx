import type { ReactNode } from "react";
import * as S from "./style";

interface Props {
  label: string;
  children: ReactNode;
  required?: boolean;
}

const WithLabel = ({ label, children, required = false }: Props) => {
  return (
    <S.Container>
      <S.Label>
        {label}
        {required && <S.RequiredDot />}
      </S.Label>
      {children}
    </S.Container>
  );
};

export default WithLabel;
