import { useSubmit } from "@/features/edit-app/hooks/useSubmit";
import { FilledButton } from "@b1nd/dodam-design-system";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
}

const Submit = ({ isEditMode, setIsEditMode }: Props) => {
  const submit = useSubmit(() => setIsEditMode(false));

  return (
    <FilledButton onClick={isEditMode ? submit : () => setIsEditMode(true)}>
      {isEditMode ? "수정 완료" : "정보 수정하기"}
    </FilledButton>
  );
};

export default Submit;
