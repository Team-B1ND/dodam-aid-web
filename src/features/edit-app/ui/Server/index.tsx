import { Column, Row, Spacer } from "@/shared/styles/common";
import WithLabel from "@/widgets/with-label/ui";
import * as S from "./style";
import { useEditServer } from "@/features/edit-app/hooks/useEditServer";
import { FilledTextField, Switch } from "@b1nd/dodam-design-system";

interface Props {
  isEditMode: boolean;
}

const Server = ({ isEditMode }: Props) => {
  const { server, handleTextForm, handleSwitch } = useEditServer();

  if (isEditMode)
    return (
      <Column $gap={24} $align="stretch">
        {server.useServer && (
          <>
            <FilledTextField
              value={server.name}
              onChange={handleTextForm}
              name="name"
              type="text"
              required
              label="서버 이름"
              placeholder="서버 이름을 입력해 주세요."
            />
            <FilledTextField
              value={server.serverAddress}
              onChange={handleTextForm}
              name="serverAddress"
              type="text"
              required
              label="물리 서버 주소"
              placeholder="물리 서버 주소를 입력해 주세요."
            />
            <FilledTextField
              value={server.redirectPath}
              onChange={handleTextForm}
              name="redirectPath"
              type="text"
              required
              label="서버 path"
              placeholder="서버 path를 입력해 주세요."
            />
          </>
        )}
        <Row $align="center">
          <S.Label>서버 활성화</S.Label>
          <Spacer />
          <Switch checked={server.useServer} onChange={handleSwitch} />
        </Row>
      </Column>
    );

  return (
    <Column $gap={24}>
      {server.useServer && (
        <>
          <WithLabel label="서버 이름">
            <S.Value>{server.name}</S.Value>
          </WithLabel>
          <WithLabel label="물리 서버 주소">
            <S.Value>{server.serverAddress}</S.Value>
          </WithLabel>
          <WithLabel label="서버 path">
            <S.Value>{server.redirectPath}</S.Value>
          </WithLabel>
        </>
      )}
      <Row $align="center">
        <S.Label>서버 활성화</S.Label>
        <Spacer />
        <Switch checked={server.useServer} onChange={handleSwitch} disabled />
      </Row>
    </Column>
  );
};

export default Server;
