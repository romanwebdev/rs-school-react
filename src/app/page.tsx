import styles from '../styles/Home.module.css';
import Main from './components/Main';

export default function Home() {
  return (
    <div className={styles.home} data-testid="home">
      <Main />
    </div>
  );
}
