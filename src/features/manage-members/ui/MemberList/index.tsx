import MemberSearch from "@/features/manage-members/ui/MemberSearch";
import { Column, Row, Spacer } from "@/shared/styles/common";
import { Checkbox, FilledButton } from "@b1nd/dodam-design-system";
import { useState } from "react";
import * as S from "./style";
import MemberItem from "@/features/manage-members/ui/MemberItem";
import { useManageMember } from "@/features/manage-members/hooks/useManageMember";
import NoContent from "@/shared/ui/NoContent";

const MemberList = () => {
  const [query, setQuery] = useState("");
  const {
    selected,
    member,
    isSelected,
    handleAll,
    handleSelect,
    submit,
    isPending,
    handleCopy,
    candidates,
    team,
  } = useManageMember();
  const filtered = member.filter((m) =>
    m.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Column $gap={12}>
      <Row $align="center" $gap={16}>
        <MemberSearch query={query} setQuery={setQuery} />
        <Spacer />
        {team.isOwner && (
          <>
            <FilledButton
              role="negative"
              disabled={selected.length <= 0 || isPending}
              onClick={submit}>
              {isPending ? "처리 중..." : "내보내기"}
            </FilledButton>
            <FilledButton
              disabled={selected.length !== 1 || isPending}
              onClick={submit}>
              {isPending ? "처리 중..." : "소유자로 변경"}
            </FilledButton>
          </>
        )}

        <FilledButton role="assistive" onClick={handleCopy}>
          초대하기
        </FilledButton>
      </Row>
      <S.List>
        <S.ListHeader>
          <S.CheckboxWrapper>
            <Checkbox
              selected={
                selected.length === candidates.length && selected.length > 0
              }
              disabled={selected.length <= 0}
              onClick={handleAll}
              size="small"
            />
          </S.CheckboxWrapper>
          <S.ListTitle>팀원 목록</S.ListTitle>
        </S.ListHeader>
        {filtered.length ? (
          filtered.map((member) => (
            <MemberItem
              data={member}
              key={member.userId}
              onClick={() => handleSelect(member.userId)}
              isSelected={isSelected(member.userId)}
            />
          ))
        ) : (
          <NoContent text="팀에 등록된 팀원이 없습니다." />
        )}
      </S.List>
    </Column>
  );
};

MemberList.Skeleton = () => {
  return (
    <Column $gap={12}>
      <Row $align="center" $gap={16}>
        <MemberSearch query="" setQuery={() => {}} />
        <Spacer />
        <FilledButton role="assistive" onClick={() => {}}>
          초대하기
        </FilledButton>
      </Row>
      <S.List>
        <S.ListHeader>
          <S.HeightHolder />
          <S.ListTitle>팀원 목록</S.ListTitle>
        </S.ListHeader>
        {Array.from({ length: 5 }).map((_, idx) => (
          <MemberItem.Skeleton key={idx} />
        ))}
      </S.List>
    </Column>
  );
};

export default MemberList;
