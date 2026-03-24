import { useGetAppDetailQuery } from "@/entities/apps/queries";
import { useParams } from "react-router-dom";

export const useGetAppDetail = () => {
  const { appId } = useParams();
  const { data } = useGetAppDetailQuery(appId!);

  return data.data.data;
};
