export interface PageResponse<T> {
  content: T[];
  hasNext: boolean;
}