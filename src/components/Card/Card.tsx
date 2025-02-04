import { useNavigate } from 'react-router';
import { getIdFromUrl } from '../../utils';
import styles from './Card.module.css';

type CardProps = {
  name: string;
  url: string;
};

export default function Card({ name, url }: CardProps) {
  const navigate = useNavigate();

  const id = getIdFromUrl(url);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    navigate(`/details/${id}`);
  }

  return (
    <button
      className={styles.card}
      type="button"
      key={name}
      onClick={handleClick}
    >
      <p>{name}</p>
    </button>
  );
}
