import ReleaseList from "@/features/get-releases/ui/ReleaseList";
import { Suspense } from "react";

const AppReleasePage = () => {
  return (
    <Suspense fallback={<ReleaseList.Skeleton />}>
      <ReleaseList />
    </Suspense>
  );
};

export default AppReleasePage;
