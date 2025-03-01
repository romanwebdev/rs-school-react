import { useNavigate, useSearchParams } from 'react-router';
import { ICharacter } from '../../types/character.type';
import styles from './Details.module.css';

export async function loader({ params }: { params: { id: string } }) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${params.id}`);
  const json = await response.json();

  return json;
}

export default function Details({ loaderData }: { loaderData: ICharacter }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  if (!loaderData) return <p>Character Not Found</p>;

  function closeDetails() {
    navigate({
      pathname: `/`,
      search: searchParams.toString(),
    });
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

      <ul>
        <li>
          <strong>Name:</strong> {loaderData?.name}
        </li>
        <li>
          <strong>Birth Year:</strong> {loaderData?.birth_year}
        </li>
        <li>
          <strong>Height:</strong> {loaderData?.height}
        </li>
        <li>
          <strong>Skin Color:</strong> {loaderData?.skin_color}
        </li>
        <li>
          <strong>Eye Color:</strong> {loaderData?.eye_color}
        </li>
        <li>
          <strong>Hair Color:</strong> {loaderData?.hair_color}
        </li>
      </ul>
    </div>
  );
}
