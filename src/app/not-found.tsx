import Link from 'next/link';
import styles from '../styles/NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Page Not Found</p>
      <Link href="/">Return to home</Link>
    </div>
  );
}
