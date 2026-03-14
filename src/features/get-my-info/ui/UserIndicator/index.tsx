import { useGetMyInfoQuery } from "@/entities/users/queries";
import { FilledButton } from "@b1nd/dodam-design-system";

const UserIndicator = () => {
  const { data } = useGetMyInfoQuery();

  return <FilledButton size="medium">{data.data.data.name} 님</FilledButton>;
};

export default UserIndicator;
