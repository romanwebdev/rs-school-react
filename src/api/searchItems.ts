const API_URL = 'https://swapi.dev/api/people';

export const searchItems = async (query: string) => {
  const res = await fetch(`${API_URL}/?search=${query}`);
  const data = await res.json();

  return data;
};
