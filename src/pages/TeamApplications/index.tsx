import AppList from "@/features/get-apps/ui/AppList";
import { Suspense } from "react";

const TeamApplications = () => {
  return (
    <Suspense fallback={<AppList.Skeleton />}>
      <AppList />
    </Suspense>
  );
};

export default TeamApplications;
