import { FilledTextField } from "@b1nd/dodam-design-system";
import * as S from "./style";

interface Props {
  query: string;
  setQuery: (query: string) => void;
}

const MemberSearch = ({ query, setQuery }: Props) => {
  return (
    <S.Container>
      <FilledTextField
        label=""
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="팀원 이름으로 검색..."
      />
    </S.Container>
  );
};

export default MemberSearch;
