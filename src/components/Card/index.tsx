import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router';
import { RootState } from '../../store';
import { toggleCharacterSelection } from '../../store/characters-slice';
import { ICharacter } from '../../types/character.type';
import { getIdFromUrl } from '../../utils';
import styles from './Card.module.css';

type CardProps = {
  character: ICharacter;
};

export default function Card({ character }: CardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const characters = useSelector(
    (state: RootState) => state.characters.selectedCharacters
  );
  const [searchParams] = useSearchParams();

  const isSelected = characters.find((c) => c.name === character.name);

  const id = getIdFromUrl(character.url);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();

    navigate({
      pathname: `/details/${id}`,
      search: searchParams.toString(),
    });
  }

  function handleSelect(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch(toggleCharacterSelection(character));
  }

  return (
    <button className={styles.card} type="button" onClick={handleClick}>
      <input
        type="checkbox"
        onClick={handleSelect}
        defaultChecked={!!isSelected}
      />
      <p>{character.name}</p>
    </button>
  );
}
