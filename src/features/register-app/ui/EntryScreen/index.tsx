import { Column, Row } from "@/shared/styles/common";
import * as S from "./style";
import { FilledButton, useTheme } from "@b1nd/dodam-design-system";
import { useForm } from "@/features/register-app/hooks/useForm";
import { useFileToImage } from "@/shared/hooks/useFileToImage";
import { useMemo } from "react";

const EntryScreen = () => {
  const { icons, form } = useForm();
  const files = useMemo(
    () => [icons.lightMode, icons.darkMode] as const,
    [icons.lightMode, icons.darkMode],
  );
  const previews = useFileToImage(files);
  const theme = useTheme();

  return (
    <S.Container>
      <Column $gap={16}>
        <Column $gap={12}>
          <S.Logo src={theme === "light" ? previews[0] : previews[1]} />
          <Column $gap={2}>
            <S.AppName>{form.name || "앱 이름"}</S.AppName>
            <S.TeamName>{form.teamId || "내 팀"}</S.TeamName>
          </Column>
        </Column>
        <Column $gap={4}>
          <S.AppSubName>{form.subtitle || "앱 부제목"}</S.AppSubName>
          <S.AppDescription>{form.description || "앱 설명이 들어가는 자리입니다."}</S.AppDescription>
        </Column>
      </Column>
      <Row>
        <FilledButton size="medium" display="fill">
          서비스 시작하기
        </FilledButton>
      </Row>
    </S.Container>
  );
};

export default EntryScreen;
