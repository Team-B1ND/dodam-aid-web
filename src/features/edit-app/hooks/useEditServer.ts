import { useServerStore } from "@/features/edit-app/stores/server";
import { useGetAppDetail } from "@/features/get-app-detail/hooks/useGetAppDetail";
import { useEffect, type ChangeEvent } from "react";

export const useEditServer = () => {
  const app = useGetAppDetail();
  const { server, setServer } = useServerStore();

  useEffect(() => {
    if (!app.server) return;
    setServer({
      name: app.server.name,
      redirectPath: app.server.redirectPath,
      serverAddress: app.server.serverAddress,
      useServer: true,
    });
  }, [app]);

  const handleTextForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServer({ ...server, [name]: value });
  };

  const handleSwitch = () => {
    setServer({ ...server, useServer: !server.useServer });
  };

  return {
    server,
    handleSwitch,
    handleTextForm,
  };
};
