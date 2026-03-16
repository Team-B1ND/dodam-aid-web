import { colors, Pen, Trash } from "@b1nd/dodam-design-system";
import * as S from "./style";
import { useRef, type ChangeEvent } from "react";

interface Props {
  variant: "iconUrl" | "darkIconUrl";
  onChange: (variant: "iconUrl" | "darkIconUrl", value: File | null) => void;
  remove: () => void;
  isLoading: boolean;
  value?: string;
}

const SelectIcon = ({ variant, onChange, remove, value, isLoading }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleOpen = () => {
    ref.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(variant, file);
  };

  return (
    <S.Container>
      <S.Icon src={value || undefined} />
      <S.Overlay>
        <S.Edit onClick={handleOpen} disabled={isLoading}>
          <Pen size={32} color={colors.static.white} pointer />
          <input
            type="file"
            style={{ display: "none" }}
            ref={ref}
            onChange={handleFileChange}
          />
        </S.Edit>
        {variant === "darkIconUrl" && !!value && (
          <S.Remove onClick={remove} disabled={isLoading}>
            <Trash size={32} color={colors.static.white} pointer />
          </S.Remove>
        )}
      </S.Overlay>
    </S.Container>
  );
};

export default SelectIcon;
