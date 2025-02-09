import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { unselectAll } from '../../store/characters-slice';
import Button from '../UI/Button';
import styles from './SelectedItems.module.css';

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
    console.log('download'); // TODO: temporary
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
