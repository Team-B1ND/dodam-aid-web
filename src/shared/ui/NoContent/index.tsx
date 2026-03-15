import * as S from "./style";

interface Props {
  text: string;
}

const NoContent = ({ text }: Props) => {
  return (
    <S.Text>{text}</S.Text>
  )
}

export default NoContent