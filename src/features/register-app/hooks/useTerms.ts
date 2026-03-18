import { useTermsStore } from "@/features/register-app/stores/terms";

export const useTerms = () => {
  const { terms, setTerms } = useTermsStore();

  const handleAgree = (index: 0 | 1 | 2) => {
    const agrees = [...terms.agrees] as [boolean, boolean, boolean];
    agrees[index] = !terms.agrees[index];

    setTerms({ ...terms, agrees });
  };

  return {
    terms,
    handleAgree,
  };
};
