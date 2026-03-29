import Info from "@/features/edit-app/ui/Info";
import Preview from "@/features/edit-app/ui/Preview";
import Submit from "@/features/edit-app/ui/Submit";
import { Column, Row, Spacer } from "@/shared/styles/common";
import { Suspense, useState } from "react";

const AppDetailPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Row $gap={24}>
      <Spacer>
        <Column $gap={24}>
          <Suspense fallback={<Submit.Skeleton />}>
            <Submit isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
          </Suspense>
          <Suspense fallback={<Info.Skeleton />}>
            <Info isEditMode={isEditMode} />
          </Suspense>
        </Column>
      </Spacer>
      <Suspense fallback={<Preview.Skeleton />}>
        <Preview />
      </Suspense>
    </Row>
  );
};

export default AppDetailPage;
