import Logo from "@/shared/assets/icons/Logo";
import * as S from "./style";
import { NAVIGATIONS } from "@/widgets/header/constants/nav";
import { Link } from "react-router-dom";
import ToggleTheme from "@/widgets/header/ui/ToggleTheme";
import { useCheckScrolled } from "@/widgets/header/hooks/useCheckScrolled";
import { Suspense } from "react";
import UserIndicator from "@/features/get-my-info/ui/UserIndicator";
import { ErrorBoundary } from "react-error-boundary";
import LoginButton from "@/widgets/header/ui/LoginButton";

const Header = () => {
  const isScrolled = useCheckScrolled();

  const login = async () => {
    window.location.href = import.meta.env.VITE_LOGIN_URL!;
  };

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
          <ErrorBoundary fallback={<LoginButton onLogin={login} />}>
            <Suspense fallback={<LoginButton onLogin={login} />}>
              <UserIndicator />
            </Suspense>
          </ErrorBoundary>
        </S.Nav>
      </S.Container>
    </S.Header>
  );
};

export default Header;
