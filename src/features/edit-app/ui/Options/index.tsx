import { Column, Row, Spacer } from "@/shared/styles/common";
import * as S from "./style";
import { Switch } from "@b1nd/dodam-design-system";
import { useEditOptions } from "@/features/edit-app/hooks/useEditOptions";
import { useEditServer } from "@/features/edit-app/hooks/useEditServer";

interface Props {
  isEditMode: boolean;
}

const Options = ({ isEditMode }: Props) => {
  const { options, handleOption } = useEditOptions();
  const { server } = useEditServer();

  return (
    <Column $gap={24}>
      <Row $align="center">
        <Column $gap={4}>
          <S.Label>API 접두사 생략</S.Label>
          <S.Example>생략 시, /api/user → /user</S.Example>
        </Column>
        <Spacer />
        <Switch
          checked={options.omitApiPrefix && server.useServer}
          onChange={() => handleOption("omitApiPrefix")}
          disabled={!isEditMode}
        />
      </Row>
      <Row $align="center">
        <S.Label>푸시알람 기능 사용</S.Label>
        <Spacer />
        <Switch
          checked={options.usePushNotification && server.useServer}
          onChange={() => handleOption("usePushNotification")}
          disabled={!isEditMode}
        />
      </Row>
    </Column>
  );
};

export default Options;
