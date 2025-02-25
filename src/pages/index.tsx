import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useSearchParams } from 'next/navigation';
import Details from '../components/Details';
import Header from '../components/Header';
import Main from '../components/Main';
import styles from '../styles/Home.module.css';
import { IResponse } from '../types/response.type';

const PAGE = 1;

export const getServerSideProps = (async (context) => {
  const { page = PAGE, search = '' } = context.query;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/?page=${page}&search=${search}`
  );
  const data = await res.json();

  return { props: { data } };
}) satisfies GetServerSideProps<{
  data: IResponse;
}>;

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const searchParams = useSearchParams();
  const hasDetails = !!searchParams.get('details');

  return (
    <div className={styles.home} data-testid="home">
      <div className={styles.mainWrap}>
        <Header />
        <Main data={data} />
      </div>
      {hasDetails && <Details />}
    </div>
  );
}
