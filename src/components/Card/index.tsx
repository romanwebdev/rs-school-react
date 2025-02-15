import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toggleCharacterSelection } from '../../store/characters-slice';
import { ICharacter } from '../../types/character.type';
import { getIdFromUrl } from '../../utils';
import styles from './Card.module.css';

type CardProps = {
  character: ICharacter;
};

export default function Card({ character }: CardProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const characters = useSelector(
    (state: RootState) => state.characters.selectedCharacters
  );
  const searchParams = useSearchParams();
  const isSelected = characters.find((c) => c.name === character.name);
  const id = getIdFromUrl(character.url);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();

    if (id) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('details', id);
      router.replace(`/?${newSearchParams.toString()}`);
    }
  }

  function handleSelect(e: React.ChangeEvent) {
    e.stopPropagation();
    dispatch(toggleCharacterSelection(character));
  }

  return (
    <button className={styles.card} type="button" onClick={handleClick}>
      <input
        type="checkbox"
        onChange={handleSelect}
        checked={!!isSelected}
        onClick={(event) => event.stopPropagation()}
      />
      <p>{character.name}</p>
    </button>
  );
}
