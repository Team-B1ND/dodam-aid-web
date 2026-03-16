import Info from "@/features/edit-app/ui/Info";
import Options from "@/features/edit-app/ui/Options";
import Server from "@/features/edit-app/ui/Server";
import Submit from "@/features/edit-app/ui/Submit";
import { Column, Divider, Row, Spacer } from "@/shared/styles/common";
import { Suspense, useState } from "react";

const AppDetailPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Row $gap={24}>
      <Spacer>
        <Column $gap={24}>
          <Suspense>
            <Submit isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
          </Suspense>
          <Suspense>
            <Info isEditMode={isEditMode} />
          </Suspense>
          <Divider />
          <Suspense>
            <Server isEditMode={isEditMode} />
          </Suspense>
          <Divider />
          <Suspense>
            <Options isEditMode={isEditMode} />
          </Suspense>
        </Column>
      </Spacer>
    </Row>
  );
};

export default AppDetailPage;
