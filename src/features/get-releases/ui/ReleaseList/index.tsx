import { useGetReleases } from "@/features/get-releases/hooks/useGetReleases";
import ReleaseItem from "@/features/get-releases/ui/ReleaseItem";
import ReleaseSearch from "@/features/get-releases/ui/ReleaseSearch";
import { Column, Row, Spacer } from "@/shared/styles/common";
import NoContent from "@/shared/ui/NoContent";
import { padDate } from "@/shared/utils/pad-date";
import {
  DatePicker,
  FilledButton,
  PickerTrigger,
} from "@b1nd/dodam-design-system";

const ReleaseList = () => {
  const {
    releases,
    date,
    keyword,
    setDate,
    setKeyword,
    observerRef,
    hasNextPage,
    isFetchingNextPage,
  } = useGetReleases();

  return (
    <Column $gap={32}>
      <Row $align="center">
        <ReleaseSearch query={keyword} setQuery={setKeyword} />
        <Spacer />
        <PickerTrigger
          content={({ onClose }) => (
            <DatePicker.Content
              date={date}
              onChangeDate={setDate}
              onClose={onClose}
            />
          )}>
          <FilledButton role="assistive">
            {date ? padDate(date) : "YYYY-MM-DD"}
          </FilledButton>
        </PickerTrigger>
      </Row>
      <Column $gap={16}>
        {releases.length ? (
          releases.map((release) => (
            <ReleaseItem data={release} key={release.releaseId} />
          ))
        ) : (
          <NoContent text="릴리즈 내역이 없어요." />
        )}

        {isFetchingNextPage &&
          Array.from({ length: 2 }).map((_, idx) => (
            <ReleaseItem.Skeleton key={idx} />
          ))}

        {hasNextPage && <div ref={observerRef} />}
      </Column>
    </Column>
  );
};

ReleaseList.Skeleton = () => {
  return (
    <Column $gap={32}>
      <ReleaseSearch query={""} setQuery={() => {}} />
      <Column $gap={16}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <ReleaseItem.Skeleton key={idx} />
        ))}
      </Column>
    </Column>
  );
};

export default ReleaseList;
