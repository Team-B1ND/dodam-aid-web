import {
  Dropdown,
  FileInput,
  FilledTextField,
} from "@b1nd/dodam-design-system";
import Section from "@/widgets/section/ui";
import WithLabel from "@/widgets/with-label/ui";
import { Column, Row, Spacer } from "@/shared/styles/common";
import { useDefaultInfo } from "@/features/register-app/hooks/useDefaultInfo";

const DefaultInfo = () => {
  const { defaultInfo, teamsOption, handleTextForm, handleIcon, handleTeam } =
    useDefaultInfo();

  return (
    <Section title="기본 정보">
      <Column $gap={28}>
        <Row $gap={16} $align="stretch">
          <Spacer>
            <FilledTextField
              placeholder="도담도담"
              label="앱 이름"
              type="text"
              name="name"
              required
              value={defaultInfo.name}
              onChange={handleTextForm}
            />
          </Spacer>
          <Spacer>
            <WithLabel label="소속 팀 선택" required>
              <Dropdown
                items={teamsOption}
                onSelectedItemChange={handleTeam}
                value={defaultInfo.team?.name || "선택하세요."}
                customStyle={{ width: "100%", height: "100%" }}
              />
            </WithLabel>
          </Spacer>
        </Row>
        <Row $gap={16}>
          <Spacer>
            <FileInput
              label="앱 로고"
              onChange={(e) => handleIcon("lightMode", e)}
              required
              value={defaultInfo.icons.lightMode}
              accept="image/*"
            />
          </Spacer>
          <Spacer>
            <FileInput
              label="다크모드 앱 로고"
              onChange={(e) => handleIcon("darkMode", e)}
              value={defaultInfo.icons.darkMode}
              accept="image/*"
            />
          </Spacer>
        </Row>
      </Column>
    </Section>
  );
};

export default DefaultInfo;
