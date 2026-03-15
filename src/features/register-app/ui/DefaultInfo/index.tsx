import {
  Dropdown,
  FileInput,
  FilledTextField,
} from "@b1nd/dodam-design-system";
import Section from "@/widgets/section/ui";
import WithLabel from "@/widgets/with-label/ui";
import { Column, Row, Spacer } from "@/shared/styles/common";
import { useForm } from "@/features/register-app/hooks/useForm";

const DefaultInfo = () => {
  const {
    form,
    handleField,
    icons,
    handleIcons,
    teamsOption,
    team,
    handleTeam,
  } = useForm();

  return (
    <Section title="기본 정보">
      <Column $gap={28}>
        <Row $gap={16} $align="stretch">
          <Spacer>
            <FilledTextField
              placeholder="도담도담"
              label="앱 이름"
              type="text"
              required
              value={form.name}
              onChange={(e) => handleField("name", e.target.value)}
            />
          </Spacer>
          <Spacer>
            <WithLabel label="소속 팀 선택" required>
              <Dropdown
                items={teamsOption}
                onSelectedItemChange={handleTeam}
                value={team?.name || "선택하세요."}
                customStyle={{ width: "100%", height: "100%" }}
              />
            </WithLabel>
          </Spacer>
        </Row>
        <Row $gap={16}>
          <Spacer>
            <FileInput
              label="앱 로고"
              onChange={(e) => handleIcons("lightMode", e)}
              required
              value={icons.lightMode}
              accept="image/*"
            />
          </Spacer>
          <Spacer>
            <FileInput
              label="다크모드 앱 로고"
              onChange={(e) => handleIcons("darkMode", e)}
              value={icons.darkMode}
              accept="image/*"
            />
          </Spacer>
        </Row>
      </Column>
    </Section>
  );
};

export default DefaultInfo;
