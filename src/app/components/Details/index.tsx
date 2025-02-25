import { useRouter, useSearchParams } from 'next/navigation';
import { ICharacter } from '../../../types/character.type';
import { getIdFromUrl } from '../../../utils';
import styles from './Details.module.css';

export default function Details({
  characters = [],
}: {
  characters: ICharacter[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('details');
  const character = characters.find((char) => getIdFromUrl(char.url) === id);
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
      {character ? (
        <ul>
          <li>
            <strong>Name:</strong> {character.name}
          </li>
          <li>
            <strong>Birth Year:</strong> {character.birth_year}
          </li>
          <li>
            <strong>Height:</strong> {character.height}
          </li>
          <li>
            <strong>Skin Color:</strong> {character.skin_color}
          </li>
          <li>
            <strong>Eye Color:</strong> {character.eye_color}
          </li>
          <li>
            <strong>Hair Color:</strong> {character.hair_color}
          </li>
        </ul>
      ) : (
        <p>Character Not Found</p>
      )}
    </div>
  );
}
