import { IData } from '../types/data.type';

export default function DataView({ data }: { data: IData }) {
  return (
    <div className="data-view">
      <h3>Data from form</h3>
      <ul>
        {Object.entries(data).map((item) => (
          <li key={item[0]}>
            {item[0] === 'image' ? (
              <img src={item[1]} alt="Image from form" />
            ) : (
              <>
                <b>{item[0]}</b>: <span>{item[1]}</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
