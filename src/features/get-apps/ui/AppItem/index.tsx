import type { AppListItemRes } from "@/entities/apps/types/dto/res";
import * as S from "./style";
import { Column, Skeleton, Spacer } from "@/shared/styles/common";
import { getStatus } from "@/features/get-apps/utils/get-status";
import { useLocation } from "react-router-dom";
import { shapes, useTheme } from "@b1nd/dodam-design-system";

interface Props {
  data: AppListItemRes;
}

const AppItem = ({ data }: Props) => {
  const { pathname } = useLocation();
  const theme = useTheme();

  return (
    <S.Container to={`${pathname}/apps/${data.appId}`}>
      <S.Logo
        src={
          theme === "dark" && data.darkIconUrl ? data.darkIconUrl : data.iconUrl
        }
      />
      <Spacer>
        <Column $gap={4}>
          <S.Name>{data.name}</S.Name>
          <S.Status
            $releaseEnabled={data.releaseEnabled}
            $releaseStatus={data.releaseStatus}>
            {getStatus(data.releaseEnabled, data.releaseStatus)?.text}
          </S.Status>
        </Column>
      </Spacer>
    </S.Container>
  );
};

AppItem.Skeleton = () => {
  return (
    <S.Container to={""}>
      <Skeleton $width="64px" $height="64px" $radius={shapes.medium} />
      <Spacer>
        <Column $gap={4}>
          <Skeleton $width="94px" $height="28px" $radius={shapes.medium} />
          <Skeleton $width="280px" $height="27px" $radius={shapes.medium} />
        </Column>
      </Spacer>
    </S.Container>
  );
};

export default AppItem;
