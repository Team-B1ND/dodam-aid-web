import EntryScreen from "@/features/register-app/ui/EntryScreen";
import { Column } from "@/shared/styles/common";
import {
  SegmentedButton,
  type SegmentedButtonData,
} from "@b1nd/dodam-design-system";
import * as S from "./style";
import { useState } from "react";
import PushScreen from "@/features/register-app/ui/PushScreen";

const Preview = () => {
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
        {selected === "push-screen" ? <PushScreen /> : <EntryScreen />}
      </Column>
    </S.Container>
  );
};

export default Preview;
