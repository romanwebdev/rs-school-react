import { useRouter } from 'next/navigation';

export const useUpdateSearchParams = () => {
  const router = useRouter();

  const updateSearchParams = (newPage: string, search: string) => {
    const params = new URLSearchParams();
    params.set('page', newPage);

    if (search) {
      params.set('search', search);
    }

    router.push(`/?${params.toString()}`);
  };

  return updateSearchParams;
};
