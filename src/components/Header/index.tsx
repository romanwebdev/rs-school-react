import ThemeSelection from '../ThemeSelection';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <ThemeSelection />
    </header>
  );
}
