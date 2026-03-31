import { useMenu } from "@/widgets/app-menu/hooks/useMenu";
import { Tab } from "@b1nd/dodam-design-system";

const AppMenu = () => {
  const { isInfoPage, isReleasesPage, move } =
    useMenu();

  return (
    <Tab customStyle={{ width: 254 }} onChange={move}>
      <Tab.Item selected={isInfoPage}>앱 정보</Tab.Item>
      <Tab.Item selected={isReleasesPage}>릴리즈</Tab.Item>
    </Tab>
  );
};

export default AppMenu;
