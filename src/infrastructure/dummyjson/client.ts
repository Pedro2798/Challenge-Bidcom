export const DUMMYJSON_BASE_URL = "https://dummyjson.com";

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public url: string,
  ) {
    super(`API ${status} ${statusText} on ${url}`);
    this.name = "ApiError";
  }
}

export type FetchInit = RequestInit & {
  next?: { revalidate?: number | false; tags?: string[] };
};

export async function fetchJSON<T>(path: string, init?: FetchInit): Promise<T> {
  const url = path.startsWith("http") ? path : `${DUMMYJSON_BASE_URL}${path}`;
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new ApiError(res.status, res.statusText, url);
  }
  return (await res.json()) as T;
}
