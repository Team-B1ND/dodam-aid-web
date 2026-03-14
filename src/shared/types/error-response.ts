import type { AxiosError } from "axios";

export type ErrorResponse = AxiosError<{
  code: string;
  status: number;
  message: string;
}>;
