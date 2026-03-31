import { useDetailInfo } from "@/features/register-app/hooks/useDetailInfo";
import { Column, Row, Spacer } from "@/shared/styles/common";
import Section from "@/widgets/section/ui";
import { FilledTextField } from "@b1nd/dodam-design-system";

const DetailInfo = () => {
  const { detailInfo, handleTextForm } = useDetailInfo();

  return (
    <Section title="상세 정보">
      <Column $align="start" $gap={28}>
        <Spacer>
          <FilledTextField
            placeholder="서비스를 설명하는 짧은 글을 작성해 주세요."
            label="앱 부제목"
            name="subtitle"
            type="text"
            required
            value={detailInfo.subtitle}
            onChange={handleTextForm}
          />
        </Spacer>
        <Spacer>
          <FilledTextField
            placeholder="dist 파일 릴리즈 주소를 입력해 주세요."
            label="깃허브 릴리즈 주소"
            name="githubReleaseUrl"
            type="text"
            required
            value={detailInfo.githubReleaseUrl}
            onChange={handleTextForm}
          />
        </Spacer>
        <Spacer>
          <FilledTextField
            placeholder="사용자가 서비스에 대해 이해할 수 있도록, 구체적인 메인 컨텐츠를 설명해 주세요."
            label="앱 설명"
            name="description"
            type="text"
            value={detailInfo.description}
            onChange={handleTextForm}
          />
        </Spacer>
        <Row>
          <Spacer>
            <FilledTextField
              placeholder="example@gmail.com"
              label="문의 메일 주소"
              name="inquiryMail"
              type="text"
              value={detailInfo.inquiryMail}
              onChange={handleTextForm}
            />
          </Spacer>
          <Spacer />
        </Row>
      </Column>
    </Section>
  );
};

export default DetailInfo;
