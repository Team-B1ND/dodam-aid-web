import TeamsHeader from "@/widgets/teams-header/ui/TeamsHeader";
import * as S from "./style";
import Form from "@/features/create-team/ui/Form";
import Preview from "@/features/create-team/ui/Preview";

const CreateTeamPage = () => {
  return (
    <S.Container>
      <TeamsHeader title="팀 생성" />
      <S.Content>
        <S.Form>
          <Form />
        </S.Form>
        <Preview />
      </S.Content>
    </S.Container>
  );
};

export default CreateTeamPage;
