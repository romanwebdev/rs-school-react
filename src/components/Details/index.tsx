import { useRouter, useSearchParams } from 'next/navigation';
import { useGetCharacterByIdQuery } from '../../store/star-wars-api';
import Spinner from '../UI/Spinner';
import styles from './Details.module.css';

export default function Details() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, isLoading } = useGetCharacterByIdQuery({
    id: searchParams.get('details') ?? undefined,
  });

  function closeDetails() {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.delete('details');
    router.push(`/?${newSearchParams.toString()}`);
  }

  return (
    <div className={styles.details}>
      <div className={styles.buttonWrap}>
        <button
          type="button"
          onClick={closeDetails}
          className={styles.closeBtn}
        >
          &#10006;
        </button>
      </div>
      <h2 className={styles.title}>Details</h2>
      {isLoading ? (
        <div className={styles.spinnerWrap}>
          <Spinner />
        </div>
      ) : (
        <ul>
          <li>
            <strong>Name:</strong> {data?.name}
          </li>
          <li>
            <strong>Birth Year:</strong> {data?.birth_year}
          </li>
          <li>
            <strong>Height:</strong> {data?.height}
          </li>
          <li>
            <strong>Skin Color:</strong> {data?.skin_color}
          </li>
          <li>
            <strong>Eye Color:</strong> {data?.eye_color}
          </li>
          <li>
            <strong>Hair Color:</strong> {data?.hair_color}
          </li>
        </ul>
      )}
    </div>
  );
}
