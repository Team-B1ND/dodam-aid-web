import { useIssueApiKey } from "@/features/manage-apikey/hooks/useIssueApiKey";
import { Column, Spacer } from "@/shared/styles/common";
import { FilledButton, FilledTextField } from "@b1nd/dodam-design-system";

const IssueKey = () => {
  const { issue, key, isPending } = useIssueApiKey();

  return (
    <Column $gap={12}>
      <FilledButton size="large" onClick={issue} disabled={isPending}>
        {isPending ? "발급 중..." : "API 키 발급받기"}
      </FilledButton>
      {!!key && (
        <Spacer>
          <FilledTextField
            value={key}
            readOnly
            label=""
            type="text"
          />
        </Spacer>
      )}
    </Column>
  );
};

export default IssueKey;
