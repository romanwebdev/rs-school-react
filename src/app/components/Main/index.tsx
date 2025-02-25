'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import '../../../styles/theme.css';
import { IResponse } from '../../../types/response.type';
import Details from '../Details';
import Header from '../Header';
import Pagination from '../Pagination';
import Providers from '../Providers';
import Results from '../Results';
import Search from '../Search';
import SelectedItems from '../SelectedItems';
import styles from './Main.module.css';

export default function Main({ data }: { data: IResponse }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasDetails = !!searchParams.get('details');

  function closeDetails() {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.delete('details');
    router.push(`/?${newSearchParams.toString()}`);
  }

  return (
    <Providers>
      <div className={styles.mainWrap}>
        <Header />
        <div className={styles.main}>
          <div
            className={`${hasDetails ? styles.overlay : ''}`}
            data-testid="overlay"
            onClick={closeDetails}
          ></div>
          <div className={styles.container}>
            <h1>Star Wars Charachters</h1>
            <Search />
            <Results characters={data.results} />
            <Pagination count={data.count} />
            <div className={styles.selectedItemsWrap}>
              <SelectedItems />
            </div>
          </div>
        </div>
      </div>
      {hasDetails && <Details characters={data.results} />}
    </Providers>
  );
}
