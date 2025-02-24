import { useSearchParams } from 'react-router';

const DEFAULT_PAGE = '1';
const DEFAULT_SEARCH = '';

export const useQueryParams = () => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ?? DEFAULT_PAGE;
  const search = searchParams.get('search') ?? DEFAULT_SEARCH;

  return { page, search };
};
