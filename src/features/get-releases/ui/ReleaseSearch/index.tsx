import { FilledTextField } from "@b1nd/dodam-design-system";
import * as S from "./style";

interface Props {
  query: string;
  setQuery: (query: string) => void;
}

const ReleaseSearch = ({ query, setQuery }: Props) => {
  return (
    <S.Container>
      <FilledTextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        label=""
        type="text"
        placeholder="릴리즈 검색하기..."
      />
    </S.Container>
  );
};

export default ReleaseSearch;
