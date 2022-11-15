const API_BASE_URL = 'https://who-owns-the-homes-backend.herokuapp.com/';
// const API_BASE_URL = 'http://localhost:4000/';

export const GET = <T>(url: string, queryParams: Record<string, string>) => {
  return apiRequest<T>('GET', url, queryParams);
};

const apiRequest = async <T>(
  method: 'GET',
  url: string,
  queryParams: Record<string, string>
) => {
  const searchParams = new URLSearchParams(queryParams);
  const response = fetch(`${API_BASE_URL}${url}?${searchParams.toString()}`, {
    method,
  });
  return (await response).json() as T;
};
