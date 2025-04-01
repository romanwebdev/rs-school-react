import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { unselectAll } from '../../store/characters-slice';
import { convertToCsvBlob } from '../../utils';
import Button from '../UI/Button';
import styles from './SelectedItems.module.css';

const CSV_FILE_NAME = 'sw_characters';

export default function SelectedItems() {
  const characters = useSelector(
    (state: RootState) => state.characters.selectedCharacters
  );
  const dispatch = useDispatch();
  const linkRef = useRef<HTMLAnchorElement>(null);

  if (!characters.length) return null;

  const handleUnselect = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    if (linkRef.current) {
      const csvBlob = convertToCsvBlob(characters);
      const fileName = `${characters.length}_${CSV_FILE_NAME}.csv`;

      const url = URL.createObjectURL(csvBlob);

      linkRef.current.href = url;
      linkRef.current.download = fileName;
      linkRef.current.click();
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.info}>Selected items: {characters.length}</p>
      <div className={styles.actions}>
        <Button onClick={handleUnselect}>Unselect all</Button>
        <a ref={linkRef} className={styles.hidden}></a>
        <Button onClick={handleDownload}>Donwload</Button>
      </div>
    </div>
  );
}
