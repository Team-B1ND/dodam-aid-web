import AppsHeader from "@/widgets/apps-header/ui/AppsHeader";
import * as S from "./style";
import DefaultInfo from "@/features/register-app/ui/DefaultInfo";
import DetailInfo from "@/features/register-app/ui/DetailInfo";
import HostingInfo from "@/features/register-app/ui/HostingInfo";

const RegisterApp = () => {
  return (
    <S.Container>
      <AppsHeader title="애플리케이션 등록" />
      <S.Content>
        <S.Form>
          <DefaultInfo />
          <DetailInfo />
          <HostingInfo />
        </S.Form>
        <S.Preview />
      </S.Content>
    </S.Container>
  );
};

export default RegisterApp;
