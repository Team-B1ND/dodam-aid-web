import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
}

const BASE_URL = "https://aid.dodam.b1nd.com";
const DEFAULT_IMAGE = `${BASE_URL}/light_mockup.png`;
const SITE_NAME = "APPS IN 도담도담";
const DEFAULT_DESC =
  "DGSW 학생이라면 누구나, 아이디어를 도담도담 앱에 바로 서비스할 수 있어요. 복잡한 배포 없이 팀을 만들고 서비스를 등록하세요.";

const SEO = ({
  title,
  description = DEFAULT_DESC,
  image = DEFAULT_IMAGE,
  url = BASE_URL,
  noIndex = false,
}: SEOProps) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
