import { useGetAppDetail } from "@/features/get-app-detail/hooks/useGetAppDetail";
import { Column, Row, Skeleton, Spacer } from "@/shared/styles/common";
import * as S from "./style";
import { shapes, useTheme } from "@b1nd/dodam-design-system";

const AppInfo = () => {
  const app = useGetAppDetail();
  const theme = useTheme();

  return (
    <Row $align="center" $gap={24}>
      <S.Logo
        src={
          theme === "dark" && app.darkIconUrl ? app.darkIconUrl : app.iconUrl
        }
      />
      <Spacer>
        <Column $gap={4}>
          <S.Name>{app.name}</S.Name>
          <S.Subtitle>{app.subtitle}</S.Subtitle>
        </Column>
      </Spacer>
    </Row>
  );
};

AppInfo.Skeleton = () => {
  return (
    <Row $align="center" $gap={24}>
      <Skeleton $width="108px" $height="108px" $radius={shapes.large} />
      <Spacer>
        <Column $gap={4}>
          <Skeleton $width="122px" $height="47px" $radius={shapes.large} />
          <Skeleton $width="127px" $height="27px" $radius={shapes.large} />
        </Column>
      </Spacer>
    </Row>
  );
};

export default AppInfo;
