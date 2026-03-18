import type { DropdownItem } from "@b1nd/dodam-design-system";

interface Params {
  defaultInfo: {
    name: string;
    team: DropdownItem | null;
    icons: { lightMode: File | null; darkMode: File | null };
  };
  detailInfo: {
    subtitle: string;
    githubReleaseUrl: string;
    description: string;
    inquiryMail: string;
  };
  hostingInfo: {
    useServer: boolean;
    name: string;
    serverAddress: string;
    redirectPath: string;
  };
  otherInfo: {
    omitApiPrefix: boolean;
    usePushNotification: boolean;
  };
  terms: {
    agrees: [boolean, boolean, boolean];
  };
}

export const isFilled = ({
  defaultInfo,
  detailInfo,
  hostingInfo,
  otherInfo,
  terms,
}: Params) => {
  const hasDefaultValue =
    !!defaultInfo.name.trim() ||
    !!defaultInfo.team ||
    defaultInfo.icons.lightMode !== null ||
    defaultInfo.icons.darkMode !== null;

  const hasDetailValue =
    !!detailInfo.subtitle.trim() ||
    !!detailInfo.githubReleaseUrl.trim() ||
    !!detailInfo.description.trim() ||
    !!detailInfo.inquiryMail.trim();

  const hasHostingValue =
    hostingInfo.useServer ||
    !!hostingInfo.name.trim() ||
    !!hostingInfo.serverAddress.trim() ||
    !!hostingInfo.redirectPath.trim();

  const hasOtherValue =
    otherInfo.omitApiPrefix || otherInfo.usePushNotification;

  const hasAgreesValue = terms.agrees.some((agree) => agree);

  return (
    hasDefaultValue ||
    hasDetailValue ||
    hasHostingValue ||
    hasOtherValue ||
    hasAgreesValue
  );
};
