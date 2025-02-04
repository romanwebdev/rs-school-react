import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { fetchItem } from '../../api';
import { IPerson } from '../../types/person.type';
import Spinner from '../Spinner/Spinner';
import styles from './Details.module.css';

export default function Details() {
  const navigate = useNavigate();
  const params = useParams();
  const [info, setInfo] = useState<IPerson | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (params.id) {
          const data = await fetchItem(params.id);

          if (data) {
            setInfo(data);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params]);

  function closeDetails() {
    navigate('/');
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
            <strong>Name:</strong> {info?.name}
          </li>
          <li>
            <strong>Birth Year:</strong> {info?.birth_year}
          </li>
          <li>
            <strong>Height:</strong> {info?.height}
          </li>
          <li>
            <strong>Skin Color:</strong> {info?.skin_color}
          </li>
          <li>
            <strong>Eye Color:</strong> {info?.eye_color}
          </li>
          <li>
            <strong>Hair Color:</strong> {info?.hair_color}
          </li>
        </ul>
      )}
    </div>
  );
}
