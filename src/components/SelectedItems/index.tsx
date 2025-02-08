import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import styles from './SelectedItems.module.css';

export default function SelectedItems() {
  const characters = useSelector(
    (state: RootState) => state.characters.selectedCharacters
  );

  return (
    <>
      {characters.length ? (
        <div className={styles.container}>
          <p>Selected items: {characters.length}</p>
        </div>
      ) : null}
    </>
  );
}
