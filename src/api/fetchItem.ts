export const fetchItem = async (id: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
  const data = await res.json();

  return data;
};
