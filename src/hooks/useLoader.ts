import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useLoader = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isDetailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    const startLoading = (url: string) => {
      if (!url.includes('details')) {
        setLoading(true);
      } else {
        setDetailsOpen(true);
      }
    };

    const finishLoading = (url: string) => {
      if (!url.includes('details')) {
        setLoading(false);
        setDetailsOpen(false);
      }
    };

    router.events.on('routeChangeStart', startLoading);
    router.events.on('routeChangeComplete', finishLoading);

    return () => {
      router.events.off('routeChangeStart', startLoading);
      router.events.off('routeChangeComplete', finishLoading);
    };
  }, [router]);

  return { loading, isDetailsOpen };
};
