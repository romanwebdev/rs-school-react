import { Link } from 'react-router';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Page Not Found</p>
      <Link to="/">Return to home</Link>
    </div>
  );
}
