import Logo from "@/shared/assets/icons/Logo";
import * as S from "./style";
import { NAVIGATIONS } from "@/widgets/header/constants/nav";
import { Link } from "react-router-dom";
import ToggleTheme from "@/widgets/header/ui/ToggleTheme";
import { FilledButton } from "@b1nd/dodam-design-system";
import { useCheckScrolled } from "@/widgets/header/hooks/useCheckScrolled";

const Header = () => {
  const isScrolled = useCheckScrolled();

  return (
    <S.Header $isScrolled={isScrolled}>
      <S.Container>
        <Logo />
        <S.Nav>
          {NAVIGATIONS.map(({ name, href }) => (
            <S.NavItem key={href}>
              <Link to={href}>{name}</Link>
            </S.NavItem>
          ))}
          <ToggleTheme />
          <FilledButton size="medium">로그인</FilledButton>
        </S.Nav>
      </S.Container>
    </S.Header>
  );
};

export default Header;
