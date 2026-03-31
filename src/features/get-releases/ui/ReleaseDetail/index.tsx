import * as S from "./style";
import WithLabel from "@/widgets/with-label/ui";
import { Divider, Row, Skeleton, Spacer } from "@/shared/styles/common";
import { useGetReleaseDetail } from "@/features/get-releases/hooks/useGetReleaseDetail";
import { shapes, Switch } from "@b1nd/dodam-design-system";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useToggleRelease } from "@/features/get-releases/hooks/useToggleRelease";

interface Props {
  releaseId: string;
}

const ReleaseDetail = ({ releaseId }: Props) => {
  const release = useGetReleaseDetail(releaseId);
  const { toggle, isPending } = useToggleRelease(releaseId, release.enabled);

  return (
    <S.ContentBox>
      <WithLabel label="메모">
        <S.Content>{release.memo}</S.Content>
      </WithLabel>
      <Divider />
      <WithLabel label="릴리즈 노트">
        <S.MarkdownContent>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {release.releaseNote || ""}
          </ReactMarkdown>
        </S.MarkdownContent>
      </WithLabel>
      {release.status === "ALLOWED" && (
        <>
          <Divider />
          <Row $gap={8} $align="center">
            <Spacer />
            <S.TermsText>릴리즈 활성 상태</S.TermsText>
            <Switch
              checked={release.enabled}
              onChange={toggle}
              size="small"
              disabled={isPending}
            />
          </Row>
        </>
      )}
    </S.ContentBox>
  );
};

ReleaseDetail.Skeleton = () => {
  return (
    <S.ContentBox>
      <WithLabel label="메모">
        <Skeleton $width="200px" $height="24px" $radius={shapes.medium} />
      </WithLabel>
      <Divider />
      <WithLabel label="릴리즈 노트">
        <Skeleton $width="200px" $height="24px" $radius={shapes.medium} />
      </WithLabel>
    </S.ContentBox>
  );
};

export default ReleaseDetail;
