import { Column, Row, Spacer } from "@/shared/styles/common";
import Section from "@/widgets/section/ui";
import { FilledTextField, Switch } from "@b1nd/dodam-design-system";
import * as S from "./style";

const HostingInfo = () => {
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
            />
          </Spacer>
          <Spacer>
            <FilledTextField
              placeholder="IPv4 또는 DNS"
              label="물리 서버 주소"
              type="text"
              required
            />
          </Spacer>
        </Row>
        <Row $align="start" $gap={16}>
          <Spacer>
            <FilledTextField
              placeholder="/api"
              label="서버 경로 ( path )"
              type="text"
            />
          </Spacer>
          <Spacer />
        </Row>
        <S.SwitchPrefixWrapper>
          <S.Label>서버 활성화</S.Label>
          <Switch checked onChange={() => {}} />
        </S.SwitchPrefixWrapper>
      </Column>
    </Section>
  );
};

export default HostingInfo;
