import { useGetMyInfo } from "@/features/get-my-info/hooks/useGetMyInfo";
import { FilledButton } from "@b1nd/dodam-design-system";

const UserIndicator = () => {
  const user = useGetMyInfo();

  return <FilledButton size="medium">{user.name} 님</FilledButton>;
};

export default UserIndicator;
