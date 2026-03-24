import { useGetReleasesQuery } from "@/entities/apps/queries";
import { padDate } from "@/shared/utils/pad-date";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";

export const useGetReleases = () => {
  const { appId } = useParams<{ appId: string }>();
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [date, setDate] = useState<Date>();
  const { ref, inView } = useInView();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [keyword]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetReleasesQuery(appId!, {
      keyword: debouncedKeyword || undefined,
      date: date ? padDate(date) : undefined,
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const releases = data.pages.flatMap((page) => page.data.data.content);

  return {
    releases,
    keyword,
    setKeyword,
    date,
    setDate,
    observerRef: ref,
    hasNextPage,
    isFetchingNextPage,
  };
};
