import Logo from "@/shared/assets/icons/Logo";
import * as S from "./style";
import { NAVIGATIONS } from "@/widgets/header/constants/nav";
import { Link } from "react-router-dom";
import ToggleTheme from "@/widgets/header/ui/ToggleTheme";
import { useToast } from "@b1nd/dodam-design-system";
import { useCheckScrolled } from "@/widgets/header/hooks/useCheckScrolled";
import axios from "axios";
import { Suspense } from "react";
import UserIndicator from "@/features/get-my-info/ui/UserIndicator";
import { useQueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import LoginButton from "@/widgets/header/ui/LoginButton";

const Header = () => {
  const isScrolled = useCheckScrolled();
  const toast = useToast();
  const queryClient = useQueryClient();

  const tempLogin = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          username: "rxd123",
          password: "tw080401",
        },
        { withCredentials: true },
      )
      .then(async () => {
        toast.success("로그인 성공");
        await queryClient.refetchQueries({ queryKey: ["user", "me"] });
      });
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
          <ErrorBoundary fallback={<LoginButton onLogin={tempLogin} />}>
            <Suspense fallback={<LoginButton onLogin={tempLogin} />}>
              <UserIndicator />
            </Suspense>
          </ErrorBoundary>
        </S.Nav>
      </S.Container>
    </S.Header>
  );
};

export default Header;
