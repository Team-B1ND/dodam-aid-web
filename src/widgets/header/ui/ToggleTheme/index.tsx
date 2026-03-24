import * as S from "./style";
import { colors, Moon, Sun, toggleTheme, useTheme } from "@b1nd/dodam-design-system";

const ToggleTheme = () => {
  const theme = useTheme();

  return (
    <S.Container>
      <S.Interaction onClick={toggleTheme}>
        {theme === "dark" ? (
          <Moon size={16} color={colors.text.tertiary} pointer />
        ) : (
          <Sun size={16} color={colors.text.tertiary} pointer />
        )}
      </S.Interaction>
    </S.Container>
  );
};

export default ToggleTheme;
