import styles from '../styles/Home.module.css';
import Main from './components/Main';

const fetchData = async (page: string, search: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/?page=${page}&search=${search}`
  );
  return response.json();
};

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) {
  const page = (await searchParams)?.page || '1';
  const search = (await searchParams)?.search || '';

  const data = await fetchData(page, search);

  return (
    <div className={styles.home} data-testid="home">
      <Main data={data} />
    </div>
  );
}
