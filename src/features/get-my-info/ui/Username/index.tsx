import * as S from "./style";
import { useGetMyInfo } from "@/features/get-my-info/hooks/useGetMyInfo";

const Username = () => {
  const user = useGetMyInfo();

  return <S.Name>{user.name}</S.Name>;
};

Username.Skeleton = () => {
  return <S.Name>로딩중</S.Name>;
};

export default Username;
