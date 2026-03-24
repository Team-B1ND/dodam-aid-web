import type { ReactNode } from "react";
import * as S from "./style";

interface Props {
  title: string;
  children: ReactNode;
  titleSize?: "default" | "small"
}

const Section = ({ title, children, titleSize = "default" }: Props) => {
  return (
    <S.Section $titleSize={titleSize}>
      <h3>{title}</h3>
      <div>
        {children}
      </div>
    </S.Section>
  )
}

export default Section