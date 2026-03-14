import { Column, Row, Spacer } from "@/shared/styles/common";
import Section from "@/widgets/section/ui";
import { FilledTextField, Switch } from "@b1nd/dodam-design-system";
import * as S from "./style";
import { useForm } from "@/features/register-app/hooks/useForm";

const HostingInfo = () => {
  const { form, handleServerField, checks, handleUseServer } = useForm();

  return (
    <Section title="호스팅 서버 정보">
      <Column $align="start" $gap={28}>
        <Row $align="start" $gap={16}>
          <Spacer>
            <FilledTextField
              placeholder="dodam api"
              label="서버 이름"
              type="text"
              required
              value={form.server?.name || ""}
              onChange={(e) => handleServerField("name", e.target.value)}
              disabled={!checks.useServer}
            />
          </Spacer>
          <Spacer>
            <FilledTextField
              placeholder="IPv4 또는 DNS"
              label="물리 서버 주소"
              type="text"
              required
              value={form.server?.serverAddress || ""}
              onChange={(e) => handleServerField("serverAddress", e.target.value)}
              disabled={!checks.useServer}
            />
          </Spacer>
        </Row>
        <Row $align="start" $gap={16}>
          <Spacer>
            <FilledTextField
              placeholder="/api"
              label="서버 경로 ( path )"
              type="text"
              value={form.server?.redirectPath || ""}
              onChange={(e) => handleServerField("redirectPath", e.target.value)}
              disabled={!checks.useServer}
            />
          </Spacer>
          <Spacer />
        </Row>
        <S.SwitchPrefixWrapper>
          <S.Label>서버 활성화</S.Label>
          <Switch
            checked={checks.useServer}
            onChange={handleUseServer}
          />
        </S.SwitchPrefixWrapper>
      </Column>
    </Section>
  );
};

export default HostingInfo;
