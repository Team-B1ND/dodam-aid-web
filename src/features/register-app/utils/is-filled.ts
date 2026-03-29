interface Params {
  defaultInfo: {
    name: string;
    icons: { lightMode: File | null; darkMode: File | null };
  };
  detailInfo: {
    subtitle: string;
    githubReleaseUrl: string;
    description: string;
    inquiryMail: string;
  };
  terms: {
    agrees: [boolean, boolean, boolean];
  };
}

export const isFilled = ({
  defaultInfo,
  detailInfo,
  terms,
}: Params) => {
  const hasDefaultValue =
    !!defaultInfo.name.trim() ||
    defaultInfo.icons.lightMode !== null ||
    defaultInfo.icons.darkMode !== null;

  const hasDetailValue =
    !!detailInfo.subtitle.trim() ||
    !!detailInfo.githubReleaseUrl.trim() ||
    !!detailInfo.description.trim() ||
    !!detailInfo.inquiryMail.trim();

  const hasAgreesValue = terms.agrees.some((agree) => agree);

  return (
    hasDefaultValue ||
    hasDetailValue ||
    hasAgreesValue
  );
};
