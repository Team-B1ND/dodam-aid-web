import { FilledTextField } from "@b1nd/dodam-design-system";
import * as S from "./style";

interface Props {
  query: string;
  setQuery: (query: string) => void;
}

const AppSearch = ({ query, setQuery }: Props) => {
  return (
    <S.Container>
      <FilledTextField
        type="text"
        label=""
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="애플리케이션 이름으로 검색..."
      />
    </S.Container>
  );
};

export default AppSearch;
