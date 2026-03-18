import { Column, Row, Skeleton } from "@/shared/styles/common";
import WithLabel from "@/widgets/with-label/ui";
import * as S from "./style";
import { useEditInfo } from "@/features/edit-app/hooks/useEditInfo";
import { FilledTextField, shapes } from "@b1nd/dodam-design-system";
import SelectIcon from "@/features/edit-app/ui/SelectIcon";

interface Props {
  isEditMode: boolean;
}

const Info = ({ isEditMode }: Props) => {
  const { info, handleTextForm, handleIcon, removeIcon, isLoading } =
    useEditInfo();

  if (isEditMode)
    return (
      <Column $gap={24} $align="stretch">
        <WithLabel label="앱 아이콘">
          <Row $gap={12}>
            <Column $align="center" $size="fit" $gap={4}>
              <SelectIcon
                onChange={handleIcon}
                remove={removeIcon}
                isLoading={isLoading}
                value={info.iconUrl}
                variant="iconUrl"
              />
              <S.IconText>default</S.IconText>
            </Column>
            <Column $align="center" $size="fit" $gap={4}>
              <SelectIcon
                onChange={handleIcon}
                remove={removeIcon}
                isLoading={isLoading}
                value={info.darkIconUrl}
                variant="darkIconUrl"
              />
              <S.IconText>dark mode</S.IconText>
            </Column>
          </Row>
        </WithLabel>
        <FilledTextField
          value={info.subtitle}
          name="subtitle"
          onChange={handleTextForm}
          type="text"
          label="앱 부제목"
          placeholder="앱 부제목을 입력해 주세요."
          required
        />
        <FilledTextField
          value={info.description}
          name="description"
          onChange={handleTextForm}
          type="text"
          label="앱 설명"
          placeholder="앱 설명을 입력해 주세요."
        />
        <FilledTextField
          value={info.inquiryMail}
          name="inquiryMail"
          onChange={handleTextForm}
          type="text"
          label="문의 메일 주소"
          placeholder="문의 메일 주소를 입력해 주세요."
        />
      </Column>
    );

  return (
    <Column $gap={24}>
      <WithLabel label="앱 아이콘">
        <Row $gap={12}>
          <Column $align="center" $size="fit" $gap={4}>
            <S.Icon src={info.iconUrl || undefined} />
            <S.IconText>default</S.IconText>
          </Column>
          {info.darkIconUrl && (
            <Column $align="center" $size="fit" $gap={4}>
              <S.Icon src={info.darkIconUrl} />
              <S.IconText>dark mode</S.IconText>
            </Column>
          )}
        </Row>
      </WithLabel>
      <WithLabel label="앱 부제목">
        <S.Value>{info.subtitle}</S.Value>
      </WithLabel>
      <WithLabel label="앱 설명">
        <S.Value>{info.description || "앱 설명이 없습니다."}</S.Value>
      </WithLabel>
      <WithLabel label="문의 메일 주소">
        <S.Value>{info.inquiryMail || "문의 메일이 없습니다."}</S.Value>
      </WithLabel>
    </Column>
  );
};

Info.Skeleton = () => {
  return (
    <Column $gap={24}>
      <WithLabel label="앱 아이콘">
        <Row $gap={12}>
          <Column $align="center" $size="fit" $gap={4}>
            <Skeleton $height="84px" $width="84px" $radius={shapes.small} />
            <S.IconText>default</S.IconText>
          </Column>
          <Column $align="center" $size="fit" $gap={4}>
            <Skeleton $height="84px" $width="84px" $radius={shapes.small} />
            <S.IconText>dark mode</S.IconText>
          </Column>
        </Row>
      </WithLabel>
      <WithLabel label="앱 설명">
        <Skeleton $width="240px" $height="24px" $radius={shapes.small} />
      </WithLabel>
      <WithLabel label="문의 메일 주소">
        <Skeleton $width="140px" $height="24px" $radius={shapes.small} />
      </WithLabel>
    </Column>
  );
};

export default Info;
