import EntryScreen from "@/features/register-app/ui/EntryScreen";
import { Column } from "@/shared/styles/common";
import { Tab } from "@b1nd/dodam-design-system";
import * as S from "./style";
import { useState } from "react";
import PushScreen from "@/features/register-app/ui/PushScreen";

// TODO: 세그먼트로 바꾸기

const Preview = () => {
  const [screen, setScreen] = useState(0);

  return (
    <S.Container>
      <Column $gap={16}>
        <Tab onChange={setScreen}>
          <Tab.Item selected={screen === 0}>진입 화면</Tab.Item>
          <Tab.Item selected={screen === 1}>푸시 알림</Tab.Item>
        </Tab>
        {screen ? <PushScreen /> : <EntryScreen />}
      </Column>
    </S.Container>
  );
};

export default Preview;
