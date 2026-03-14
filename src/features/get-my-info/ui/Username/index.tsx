import { useGetMyInfoQuery } from "@/entities/users/queries";
import * as S from "./style";

const Username = () => {
  const { data } = useGetMyInfoQuery();

  return <S.Name>{data.data.data.name}</S.Name>;
};

Username.Skeleton = () => {
  return <S.Name>로딩중</S.Name>;
};

export default Username;
