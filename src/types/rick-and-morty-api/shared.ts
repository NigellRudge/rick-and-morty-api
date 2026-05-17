export interface Response<T> {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string | null;
  };
  results: T[];
}
