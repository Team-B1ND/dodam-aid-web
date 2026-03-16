import type { Release } from "@/entities/apps/types";
import { Column, Divider, Row, Skeleton, Spacer } from "@/shared/styles/common";
import * as S from "./style";
import { formatDate } from "@/shared/utils/format-date";
import {
  CheckmarkCircleFill,
  ChevronDown,
  ChevronUp,
  Clock,
  colors,
  shapes,
  XmarkCircle,
} from "@b1nd/dodam-design-system";
import WithLabel from "@/widgets/with-label/ui";
import { useState } from "react";

interface Props {
  data: Release;
}

const ReleaseItem = ({ data }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Column $gap={12}>
      <S.Container onClick={() => setIsOpen((prev) => !prev)}>
        <Row $gap={8}>
          {data.status === "ALLOWED" ? (
            <CheckmarkCircleFill size={24} color={colors.status.success} />
          ) : data.status === "PENDING" ? (
            <Clock size={24} color={colors.status.warning} />
          ) : (
            <XmarkCircle size={24} color={colors.status.error} />
          )}
          <Column $gap={4} $size="fit">
            <S.Date>{formatDate(data.modifiedAt)}</S.Date>
            <S.User>By {data.updatedUser?.name || "unknown"}</S.User>
          </Column>
          <Spacer />
          <Column $align="center" $size="fit">
            {isOpen ? (
              <ChevronUp size={24} color={colors.text.primary} pointer />
            ) : (
              <ChevronDown size={24} color={colors.text.primary} pointer />
            )}
          </Column>
        </Row>
      </S.Container>
      {isOpen && (
        <S.ContentBox>
          <WithLabel label="메모">
            <S.Content>{data.memo}</S.Content>
          </WithLabel>
          <Divider />
          <WithLabel label="릴리즈 노트">
            <S.Content>{data.releaseNote}</S.Content>
          </WithLabel>
        </S.ContentBox>
      )}
    </Column>
  );
};

ReleaseItem.Skeleton = () => {
  return (
    <Row $gap={8}>
      <Skeleton $width="24px" $height="24px" $radius={shapes.medium} />
      <Column $gap={4} $size="fit">
        <Skeleton $width="132px" $height="24px" $radius={shapes.medium} />
        <Skeleton $width="72px" $height="24px" $radius={shapes.medium} />
      </Column>
      <Spacer />
      <Row $align="center" $size="fit">
        <ChevronDown size={24} color={colors.text.primary} />
      </Row>
    </Row>
  );
};

export default ReleaseItem;
