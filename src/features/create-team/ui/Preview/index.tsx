import { Column } from "@/shared/styles/common";
import * as S from "./style";
import { colors, Link } from "@b1nd/dodam-design-system";
import { useForm } from "@/features/create-team/hooks/useForm";
import { useFileToImage } from "@/shared/hooks/useFileToImage";
import { getLinkText } from "@/features/create-team/utils/get-link-text";

const Preview = () => {
  const { form, logo } = useForm();
  const preview = useFileToImage([logo]);

  return (
    <S.Container>
      <Column $gap={12}>
        <S.Logo src={preview[0]} />
        <Column $gap={4}>
          <S.Name>{form.name || "팀 이름"}</S.Name>
          <S.Description>
            {form.description || "팀 설명이 들어갈 자리입니다."}
          </S.Description>
        </Column>
        {form.githubUrl && (
          <S.LinkWrap to={form.githubUrl} target="_blank">
            <Link size={20} color={colors.status.info} />
            <S.LinkText>{getLinkText(form.githubUrl)}</S.LinkText>
          </S.LinkWrap>
        )}
      </Column>
    </S.Container>
  );
};

export default Preview;
