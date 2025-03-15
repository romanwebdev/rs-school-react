import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetUpdateStatusese } from '../store/formSlice';
import { IData } from '../types/data.type';

const formatData = (key: string, value: string | string[]) => {
  switch (key) {
    case 'image':
      return <img src={value as string} alt="Image from form" />;
    case 'countries':
      return (
        <>
          <b>{key}</b>: <span>{(value as string[]).join(', ')}</span>
        </>
      );
    case 'terms':
      return (
        <>
          <b>{key}</b>: <span>{value.toString()}</span>
        </>
      );
    default:
      return (
        <>
          <b>{key}</b>: <span>{value}</span>
        </>
      );
  }
};

type DataViewProps = {
  data: IData;
  isUpdated: boolean;
};

export default function DataView({ data, isUpdated }: DataViewProps) {
  const [updated, setUpdated] = useState(isUpdated);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setUpdated(false);
      dispatch(resetUpdateStatusese());
    }, 1500);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className={'data-view ' + (updated ? 'updated' : '')}>
      <h3>Data from form</h3>
      <ul>
        {Object.entries(data).map((item) => (
          <li key={item[0]}>{formatData(item[0], item[1])}</li>
        ))}
      </ul>
    </div>
  );
}
