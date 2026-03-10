import { Dropdown, FilledTextField } from "@b1nd/dodam-design-system";
import Section from "@/widgets/section/ui";
import WithLabel from "@/widgets/with-label/ui";
import { Column, Row, Spacer } from "@/shared/styles/common";

const DefaultInfo = () => {
  return (
    <Section title="기본 정보">
      <Column $gap={28}>
        <Row $gap={16}>
          <Spacer>
            <FilledTextField
              placeholder="도담도담"
              label="앱 이름"
              type="text"
              required
            />
          </Spacer>
          <Spacer>
            <WithLabel label="소속 팀 선택" required>
              <Dropdown
                items={[]}
                onSelectedItemChange={() => {}}
                value="선택하세요"
                customStyle={{ width: "100%" }}
              />
            </WithLabel>
          </Spacer>
        </Row>
        <Row $gap={16}>
          <Spacer>
            <FilledTextField
              placeholder="도담도담"
              label="앱 로고"
              type="text"
              required
            />
          </Spacer>
          <Spacer>
            <FilledTextField
              placeholder="도담도담"
              label="앱 다크모드 로고"
              type="text"
              required
            />
          </Spacer>
        </Row>
      </Column>
    </Section>
  );
};

export default DefaultInfo;
