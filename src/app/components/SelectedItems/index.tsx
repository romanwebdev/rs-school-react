import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { unselectAll } from '../../../store/characters-slice';
import { downloadCSV } from '../../../utils';
import Button from '../UI/Button';
import styles from './SelectedItems.module.css';

const CSV_FILE_NAME = 'sw_characters';

export default function SelectedItems() {
  const characters = useSelector(
    (state: RootState) => state.characters.selectedCharacters
  );
  const dispatch = useDispatch();

  if (!characters.length) return null;

  const handleUnselect = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    downloadCSV(characters, CSV_FILE_NAME);
  };

  return (
    <div className={styles.container}>
      <p className={styles.info}>Selected items: {characters.length}</p>
      <div className={styles.actions}>
        <Button onClick={handleUnselect}>Unselect all</Button>
        <Button onClick={handleDownload}>Donwload</Button>
      </div>
    </div>
  );
}
