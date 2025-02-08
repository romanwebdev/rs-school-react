export const fetchItems = async (query: string, page: number = 1) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/?page=${page}&search=${query}`
  );
  const data = await res.json();

  return data;
};
