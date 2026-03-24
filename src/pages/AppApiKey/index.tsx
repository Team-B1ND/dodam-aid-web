import IssueKey from "@/features/manage-apikey/ui/IssueKey";
import { Column } from "@/shared/styles/common";
import * as S from "./style";
import History from "@/features/manage-apikey/ui/History";
import { Suspense } from "react";

const AppApiKeyPage = () => {
  return (
    <Column $gap={24}>
      <IssueKey />
      <Column $gap={16}>
        <S.Title>키 발급 현황</S.Title>
        <Suspense fallback={<History.Skeleton />}>
          <History />
        </Suspense>
      </Column>
    </Column>
  );
};

export default AppApiKeyPage;
