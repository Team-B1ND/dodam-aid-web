import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyle from "@/shared/styles/GlobalStyle";
import Router from "@/shared/routes";
import "@b1nd/dodam-design-system/colors/colors.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <GlobalStyle />
    <Router />
  </QueryClientProvider>,
);
