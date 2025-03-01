import { Provider } from 'react-redux';
import { Outlet } from 'react-router';
import Header from '../../components/Header';
import Main from '../../components/Main';
import { ThemeProvider } from '../../context';
import { store } from '../../store';
import { IResponse } from '../../types/response.type';
import styles from './Home.module.css';

export async function loader({ request }: { request: Request }) {
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get('page');
  const search = searchParams.get('search');

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/?page=${page ?? 1}&search=${search ?? ''}`
  );
  const json = await response.json();

  return json;
}

export default function Home({ loaderData }: { loaderData: IResponse }) {
  const { results = [], count } = loaderData;

  return (
    <ThemeProvider>
      <Provider store={store}>
        <div className={styles.home} data-testid="home">
          <div className={styles.mainWrap}>
            <Header />
            <Main characters={results} count={count} />
          </div>
          <Outlet />
        </div>
      </Provider>
    </ThemeProvider>
  );
}
