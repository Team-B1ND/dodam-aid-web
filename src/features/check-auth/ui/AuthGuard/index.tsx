import { useGetMyInfo } from "@/features/get-my-info/hooks/useGetMyInfo";

const AuthGuard = () => {
  useGetMyInfo();
  return null;
};

export default AuthGuard;
