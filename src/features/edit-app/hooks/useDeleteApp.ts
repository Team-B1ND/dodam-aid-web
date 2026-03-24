import { useDeleteAppMutation } from "@/entities/apps/mutations";
import { useGetAppDetail } from "@/features/get-app-detail/hooks/useGetAppDetail";
import { useLocation, useNavigate } from "react-router-dom";

export const useDeleteApp = () => {
  const app = useGetAppDetail();
  const { pathname } = useLocation();
  const tokens = pathname.split("/");
  const { mutateAsync, isPending } = useDeleteAppMutation();
  const navigate = useNavigate();

  const deleteSubmit = async () => {
    await mutateAsync(app.appId);
    navigate(`/${tokens[1]}/${tokens[2]}`);
  };

  return {
    deleteSubmit,
    isPending,
  };
};
