import { useGetReleaseDetailQuery } from "@/entities/apps/queries";

export const useGetReleaseDetail = (releaseId: string) => {
  const { data } = useGetReleaseDetailQuery(releaseId);

  return data.data.data;
};
