import MemberList from "@/features/manage-members/ui/MemberList";
import { Suspense } from "react";

const TeamMembersPage = () => {
  return (
    <Suspense fallback={<MemberList.Skeleton />}>
      <MemberList />
    </Suspense>
  );
};

export default TeamMembersPage;
