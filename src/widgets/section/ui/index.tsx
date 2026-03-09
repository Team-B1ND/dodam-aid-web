import type { ReactNode } from "react";
import * as S from "./style";

interface Props {
  title: string;
  children: ReactNode;
}

const Section = ({ title, children }: Props) => {
  return (
    <S.Section>
      <h3>{title}</h3>
      <div>
        {children}
      </div>
    </S.Section>
  )
}

export default Section