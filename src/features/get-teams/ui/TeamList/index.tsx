import { useGetTeams } from "@/features/get-teams/hooks/useGetTeams";
import TeamItem from "@/features/get-teams/ui/TeamItem";
import { Column } from "@/shared/styles/common";
import NoContent from "@/shared/ui/NoContent";

const TeamList = () => {
  const teams = useGetTeams();

  return (
    <Column $gap={16}>
      {teams.length ? (
        teams.map((team) => <TeamItem data={team} key={team.teamId} />)
      ) : (
        <NoContent text="소속된 팀이 없어요." />
      )}
    </Column>
  );
};

TeamList.Skeleton = () => {
  return (
    <Column $gap={16}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <TeamItem.Skeleton key={idx} />
      ))}
    </Column>
  );
};

export default TeamList;
