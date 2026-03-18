import { useFilterAppsByName } from "@/features/get-apps/hooks/useFilterAppsByName";
import { useGetAppsInTeam } from "@/features/get-apps/hooks/useGetAppsInTeam";
import AppItem from "@/features/get-apps/ui/AppItem";
import AppSearch from "@/features/get-apps/ui/AppSearch";
import { Column, Row, Spacer } from "@/shared/styles/common";
import NoContent from "@/shared/ui/NoContent";
import { colors, FilledButton, Plus } from "@b1nd/dodam-design-system";
import { useNavigate } from "react-router-dom";

const AppList = () => {
  const navigate = useNavigate();
  const apps = useGetAppsInTeam();
  const { query, handleQuery, filtered } = useFilterAppsByName(apps);

  return (
    <Column $gap={12}>
      <Row $align="center">
        <AppSearch query={query} setQuery={handleQuery} />
        <Spacer />
        <FilledButton size="medium" onClick={() => navigate("/apps/register")}>
          <Plus size={18} color={colors.static.white} />
          <p style={{ marginLeft: 4 }}>애플리케이션 등록하기</p>
        </FilledButton>
      </Row>
      {filtered.length ? (
        filtered.map((app) => <AppItem data={app} key={app.appId} />)
      ) : (
        <NoContent text="등록된 앱이 없습니다." />
      )}
    </Column>
  );
};

AppList.Skeleton = () => {
  return (
    <Column $gap={12}>
      <Row $align="center">
        <AppSearch query="" setQuery={() => {}} />
        <Spacer />
        <FilledButton size="medium" onClick={() => {}}>
          <Plus size={18} color={colors.static.white} />
          <p style={{ marginLeft: 4 }}>애플리케이션 등록하기</p>
        </FilledButton>
      </Row>
      {Array.from({ length: 5 }).map((_, idx) => (
        <AppItem.Skeleton key={idx} />
      ))}
    </Column>
  );
};

export default AppList;
