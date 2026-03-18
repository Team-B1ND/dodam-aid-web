import { Column, Skeleton } from "@/shared/styles/common";
import * as S from "./style";
import { HEADER } from "@/features/manage-apikey/constants/header";
import { useGetApiKeyHistory } from "@/features/manage-apikey/hooks/useGetApiKeyHistory";
import { formatDate } from "@/shared/utils/format-date";
import { colors, shapes } from "@b1nd/dodam-design-system";
import NoContent from "@/shared/ui/NoContent";

const History = () => {
  const apiKeyHistory = useGetApiKeyHistory();

  return (
    <Column>
      <S.TableRow>
        {HEADER.map(({ width, name }) => (
          <S.HeaderItem $width={width}>{name}</S.HeaderItem>
        ))}
      </S.TableRow>
      {apiKeyHistory.length ? (
        apiKeyHistory.map((history, idx) => (
          <S.TableRow key={history.createdAt}>
            <S.BodyItem $width="96px">{idx + 1}</S.BodyItem>
            <S.BodyItem
              $width="160px"
              style={{
                color: !history.isExpired
                  ? colors.brand.primary
                  : colors.text.primary,
              }}>
              {history.isExpired ? "X" : "O"}
            </S.BodyItem>
            <S.BodyItem $width="160px">
              {formatDate(history.createdAt)}
            </S.BodyItem>
            <S.BodyItem $width="160px">
              {formatDate(history.expiredAt)}
            </S.BodyItem>
          </S.TableRow>
        ))
      ) : (
        <NoContent text="API Key를 발급한 이력이 없어요." />
      )}
    </Column>
  );
};

History.Skeleton = () => {
  return (
    <Column>
      <S.TableRow>
        {HEADER.map(({ width, name }) => (
          <S.HeaderItem $width={width}>{name}</S.HeaderItem>
        ))}
      </S.TableRow>
      {Array.from({ length: 5 }).map((_, idx) => (
        <S.TableRow key={idx}>
          <S.BodyItem $width="96px">
            <Skeleton
              $width="24px"
              $height="24px"
              $radius={shapes.extraSmall}
            />
          </S.BodyItem>
          <S.BodyItem $width="160px">
            <Skeleton
              $width="24px"
              $height="24px"
              $radius={shapes.extraSmall}
            />
          </S.BodyItem>
          <S.BodyItem $width="160px">
            <Skeleton
              $width="96px"
              $height="24px"
              $radius={shapes.extraSmall}
            />
          </S.BodyItem>
          <S.BodyItem $width="160px">
            <Skeleton
              $width="96px"
              $height="24px"
              $radius={shapes.extraSmall}
            />
          </S.BodyItem>
        </S.TableRow>
      ))}
    </Column>
  );
};

export default History;
