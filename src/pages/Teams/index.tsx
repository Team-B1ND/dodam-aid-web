import TeamList from "@/features/get-teams/ui/TeamList";
import { Column } from "@/shared/styles/common";
import TeamsHeader from "@/widgets/teams-header/ui/TeamsHeader";
import { Suspense } from "react";

const TeamsPage = () => {
  return (
    <Column $gap={24}>
      <TeamsHeader title="님의 팀 목록" showUsername showCta />
      <Suspense fallback={<TeamList.Skeleton />}>
        <TeamList />
      </Suspense>
    </Column>
  );
};

export default TeamsPage;
