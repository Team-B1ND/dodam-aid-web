import Form from "@/features/edit-team/ui/Form";
import Info from "@/features/edit-team/ui/Info";
import { Suspense, useState } from "react";

const TeamSettings = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Suspense fallback={<Info.Skeleton />}>
      {isEditMode ? (
        <Form turnToReadMode={() => setIsEditMode(false)} />
      ) : (
        <Info turnToEditMode={() => setIsEditMode(true)} />
      )}
    </Suspense>
  );
};

export default TeamSettings;
