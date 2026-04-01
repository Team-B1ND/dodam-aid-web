import MemberSearch from "@/features/manage-members/ui/MemberSearch";
import { Column, Row, Spacer } from "@/shared/styles/common";
import {
  Checkbox,
  Dialog,
  FilledButton,
  useOverlay,
} from "@b1nd/dodam-design-system";
import { useState } from "react";
import * as S from "./style";
import MemberItem from "@/features/manage-members/ui/MemberItem";
import { useManageMember } from "@/features/manage-members/hooks/useManageMember";
import NoContent from "@/shared/ui/NoContent";
import { useMakeOwner } from "@/features/manage-members/hooks/useMakeOwner";

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
  const { makeOwner, isPending: isMakingOwner } = useMakeOwner(selected[0]);
  const { open } = useOverlay();

  const handleOpenMakeOwnerDialog = () => {
    open(({ close, exit, isOpen }) => (
      <Dialog
        open={isOpen}
        title="소유자를 변경할까요?"
        description="소유자를 넘기면 되돌릴 수 없어요.">
        <Dialog.FilledButton
          onClick={() => {
            close();
            exit();
          }}
          role="assistive">
          취소
        </Dialog.FilledButton>
        <Dialog.FilledButton
          onClick={async () => {
            await makeOwner();
            close();
            exit();
          }}>
          확인
        </Dialog.FilledButton>
      </Dialog>
    ));
  };

  return (
    <Column $gap={12}>
      <Row $align="center" $gap={16}>
        <MemberSearch query={query} setQuery={setQuery} />
        <Spacer />
        {team.isOwner && (
          <>
            <FilledButton
              role="negative"
              disabled={selected.length <= 0 || isPending || isMakingOwner}
              onClick={submit}>
              {isPending ? "처리 중..." : "내보내기"}
            </FilledButton>
            <FilledButton
              disabled={selected.length !== 1 || isPending || isMakingOwner}
              onClick={handleOpenMakeOwnerDialog}>
              {isMakingOwner ? "처리 중..." : "소유자로 변경"}
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
            {team.isOwner && (
              <Checkbox
                selected={
                  selected.length === candidates.length && selected.length > 0
                }
                disabled={selected.length <= 0}
                onClick={handleAll}
                size="small"
              />
            )}
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
              teamIsOwner={team.isOwner}
            />
          ))
        ) : (
          <NoContent text="팀에 등록된 팀원이 없어요." />
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
