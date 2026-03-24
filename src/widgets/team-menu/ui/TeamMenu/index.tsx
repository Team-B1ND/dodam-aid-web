import { useMenu } from "@/widgets/team-menu/hooks/useMenu";
import { Tab } from "@b1nd/dodam-design-system";

const TeamMenu = () => {
  const { isAppsPage, isMembersPage, isSettingsPage, move } = useMenu();

  return (
    <Tab customStyle={{ width: 254 }} onChange={move}>
      <Tab.Item selected={isAppsPage}>애플리케이션</Tab.Item>
      <Tab.Item selected={isSettingsPage}>설정</Tab.Item>
      <Tab.Item selected={isMembersPage}>팀원</Tab.Item>
    </Tab>
  );
};

export default TeamMenu;
