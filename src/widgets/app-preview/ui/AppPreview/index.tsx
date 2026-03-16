import { Column } from "@/shared/styles/common";
import EntryScreen from "@/widgets/app-preview/ui/EntryScreen";
import PushScreen from "@/widgets/app-preview/ui/PushScreen";
import {
  SegmentedButton,
  type SegmentedButtonData,
} from "@b1nd/dodam-design-system";
import { useState } from "react";
import * as S from "./style";

interface Props {
  name?: string;
  teamName?: string;
  subtitle?: string;
  description?: string;
  iconUrl?: string;
  darkIconUrl?: string;
  pushLink?: string;
  enablePushLink?: boolean;
}

const AppPreview = ({
  name,
  teamName,
  subtitle,
  description,
  iconUrl,
  darkIconUrl,
  pushLink = "https://dodam.b1nd.com",
  enablePushLink = false,
}: Props) => {
  const [screen, setScreen] = useState<SegmentedButtonData[]>([
    {
      text: "진입 화면",
      value: "entry-screen",
      isActive: true,
    },
    {
      text: "푸시 알림",
      value: "push-screen",
      isActive: false,
    },
  ]);
  const [selected, setSelected] = useState(screen[0].value);

  return (
    <S.Container>
      <Column $gap={16}>
        <SegmentedButton
          data={screen}
          setData={setScreen}
          onBlockClick={setSelected}
          containerCustomStyle={{ width: "100%" }}
        />

        {selected === "push-screen" ? (
          <PushScreen
            name={name}
            subtitle={subtitle}
            iconUrl={iconUrl}
            darkIconUrl={darkIconUrl}
            pushLink={pushLink}
            enablePushLink={enablePushLink}
          />
        ) : (
          <EntryScreen
            name={name}
            teamName={teamName}
            subtitle={subtitle}
            description={description}
            iconUrl={iconUrl}
          />
        )}
      </Column>
    </S.Container>
  );
};

export default AppPreview;
