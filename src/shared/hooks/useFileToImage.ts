import { useEffect, useMemo } from "react";
import { createObjectUrl, revokeObjectUrl } from "@/shared/utils/objectUrl";

type NullableFile = File | null | undefined;
type PreviewTuple<T extends readonly NullableFile[]> = {
  [K in keyof T]: string | undefined;
};

export const useFileToImage = <T extends readonly NullableFile[]>(files: T) => {
  const previews = useMemo((): PreviewTuple<T> => {
    return files.map((file) => createObjectUrl(file)) as PreviewTuple<T>;
  }, [files]);

  useEffect(() => {
    return () => {
      previews.forEach((preview) => revokeObjectUrl(preview));
    };
  }, [previews]);

  return previews;
};
