import { useSearchParams } from 'react-router';

export const useUpdateSearchParams = () => {
  const [, setSearchParams] = useSearchParams();

  const updateSearchParams = (newPage: string, search: string) => {
    const params: { page: string; search?: string } = {
      page: newPage.toString(),
    };

    if (search) {
      params.search = search;
    }

    setSearchParams(params);
  };

  return updateSearchParams;
};
