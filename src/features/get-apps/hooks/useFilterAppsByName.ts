import type { AppListItemRes } from "@/entities/apps/types/dto/res";
import { useState} from "react";

export const useFilterAppsByName = (data: AppListItemRes[]) => {
  const [query, setQuery] = useState("");

  const handleQuery = (e: string) => {
    setQuery(e);
  };

  return {
    query,
    handleQuery,
    filtered: data.filter((app) =>
      app.name.toLowerCase().includes(query.toLowerCase()),
    ),
  };
};
