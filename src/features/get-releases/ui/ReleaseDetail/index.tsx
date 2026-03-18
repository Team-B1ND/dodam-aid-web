import * as S from "./style";
import WithLabel from "@/widgets/with-label/ui";
import { Divider, Skeleton } from "@/shared/styles/common";
import { useGetReleaseDetail } from "@/features/get-releases/hooks/useGetReleaseDetail";
import { shapes } from "@b1nd/dodam-design-system";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  releaseId: string;
}

const ReleaseDetail = ({ releaseId }: Props) => {
  const release = useGetReleaseDetail(releaseId);

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
