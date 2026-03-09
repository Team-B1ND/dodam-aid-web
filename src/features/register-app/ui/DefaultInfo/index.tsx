import { Dropdown, FilledTextField } from "@b1nd/dodam-design-system";
import Section from "@/widgets/section/ui";
import WithLabel from "@/widgets/with-label/ui";
import { Column, Row } from "@/shared/styles/common";

const DefaultInfo = () => {
  return (
    <Section title="기본 정보">
      <Column $align="start" $gap={28}>
        <Row $align="start" $gap={16}>
          <FilledTextField
            placeholder="도담도담"
            label="앱 이름"
            type="text"
            required
          />
          <WithLabel label="소속 팀 선택" required>
            <Dropdown
              items={[]}
              onSelectedItemChange={() => {}}
              value="선택하세요"
            />
          </WithLabel>
        </Row>
        <Row $align="start" $gap={16}>
          <FilledTextField
            placeholder="도담도담"
            label="앱 로고"
            type="text"
            required
          />
          <FilledTextField
            placeholder="도담도담"
            label="앱 다크모드 로고"
            type="text"
            required
          />
        </Row>
      </Column>
    </Section>
  );
};

export default DefaultInfo;
