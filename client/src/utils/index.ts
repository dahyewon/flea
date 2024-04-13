import Error from 'ts-error';

export const fetcher = async <T>(
  resource: RequestInfo,
  init?: RequestInit,
): Promise<T> => {
  const response = await fetch(resource, init);

  if (!response.ok) {
    const errorResponse = await response.json();
    const errorMessage = errorResponse.message || 'API 요청 중에 에러가 발생했습니다.';
    throw new Error(errorMessage);
  }

  return response.json() as T;
};