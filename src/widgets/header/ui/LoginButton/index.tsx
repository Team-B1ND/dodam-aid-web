import { FilledButton } from "@b1nd/dodam-design-system";

interface Props {
  onLogin: () => void;
}

const LoginButton = ({ onLogin }: Props) => {
  return (
    <FilledButton size="medium" onClick={onLogin}>
      로그인
    </FilledButton>
  );
};

export default LoginButton;
